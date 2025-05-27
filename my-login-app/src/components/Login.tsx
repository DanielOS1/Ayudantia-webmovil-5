import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';    
import axiosClient from '../api/axiosClient';
import { useAuthStore } from '../stores/useAuthStore';
import { toaster } from '../components/ui/toaster';

interface LoginResponse {
  statusCode: number;
  message: string;
  data: { accessToken: string };
  success: boolean;
}

const Login: React.FC = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const bgColor = useColorModeValue('teal.50', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('teal.200', 'teal.600');

const handleSubmit = async () => {
  try {
    // 1. Login
    const res = await axiosClient.post<LoginResponse>('/auth/login', { rut, password });

    if (res.data.success) {
      const token = res.data.data.accessToken;

      try {
        // 2. Obtener perfil
        const profileRes = await axiosClient.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 3. Guardar ambos en Zustand
        // IMPORTANTE: Usar profileRes.data.data si tu API responde con esa estructura
        login(token, profileRes.data.data); // ← Aquí puede estar el problema

        toaster.create({
          title: 'Login exitoso',
          description: 'Has iniciado sesión correctamente.',
          type: 'success',
        });

        // 4. Navegar (mejor con React Router si lo tienes)
        window.location.href = '/profile';

      } catch (profileError: any) {
        // Si falla obtener el perfil, limpiar el token
        toaster.create({
          title: 'Error obteniendo perfil',
          description: 'No se pudo cargar la información del usuario.',
          type: 'error',
        });
      }
    } else {
      toaster.create({
        title: 'Error en login',
        description: res.data.message,
        type: 'error',
      });
    }
  } catch (error: any) {
    toaster.create({
      title: 'Error en login',
      description: error.response?.data?.message || error.message,
      type: 'error',
    });
  }
};

  return (
    <Box bg={bgColor} minH="100vh" py={16} px={4}>
      <Box
        maxW="md"
        mx="auto"
        p={8}
        bg={boxBg}
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Heading mb={6} textAlign="center" color="teal.600">
          Iniciar Sesión
        </Heading>
        <VStack>
          <Input
            placeholder="RUT"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            borderColor="teal.400"
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            borderColor="teal.400"
          />
          <Button
            colorScheme="teal"
            width="full"
            onClick={handleSubmit}
            _hover={{ bg: 'teal.500' }}
          >
            Entrar
          </Button>
        </VStack>
        <Text mt={4} fontSize="sm" color="gray.500" textAlign="center">
          Bienvenido de vuelta
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
