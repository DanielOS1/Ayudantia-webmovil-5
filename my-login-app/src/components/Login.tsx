import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  Text,
  Card,
  Container,
  Icon,
  Flex,
  Separator as Divider,
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';    
import axiosClient from '../api/axiosClient';
import { useAuthStore } from '../stores/useAuthStore';
import { toaster } from '../components/ui/toaster';
import { LuUser, LuLock } from 'react-icons/lu';

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

  const bgGradient = useColorModeValue(
    'linear(to-br, teal.50, blue.50, purple.50)',
    'linear(to-br, gray.900, teal.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputFocusBg = useColorModeValue('white', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const iconColor = useColorModeValue('gray.400', 'gray.500');
  const headingColor = useColorModeValue('gray.700', 'white');
  const subtitleColor = useColorModeValue('gray.500', 'gray.400');

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
    <Box 
      bgGradient={bgGradient} 
      minH="100vh" 
      display="flex" 
      alignItems="center"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgImage: 'radial-gradient(circle at 50% 50%, rgba(0, 128, 128, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none',
      }}
    >
      <Container maxW="md" centerContent>
        <Card.Root
          bg={cardBg}
          shadow="2xl"
          borderRadius="2xl"
          overflow="hidden"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor={borderColor}
          w="full"
          maxW="400px"
        >
          <Card.Body p={8}>
            {/* Header */}
            <VStack gap={2} mb={8} textAlign="center">
              <Box
                w={12}
                h={12}
                bg="teal.500"
                borderRadius="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={2}
              >
                <Icon color="white" boxSize={6}>
                  <LuUser />
                </Icon>
              </Box>
              <Heading 
                size="xl" 
                color={headingColor}
                fontWeight="bold"
                letterSpacing="tight"
              >
                Bienvenido
              </Heading>
              <Text color={subtitleColor} fontSize="sm">
                Inicia sesión en tu cuenta
              </Text>
            </VStack>

            {/* Form */}
            <VStack gap={5}>
              <Box w="full">
                <Flex align="center" gap={2} mb={2}>
                  <Icon color={iconColor} boxSize={4}>
                    <LuUser />
                  </Icon>
                  <Text fontSize="sm" fontWeight="medium" color={headingColor}>
                    RUT
                  </Text>
                </Flex>
                <Input
                  placeholder="Ingresa tu RUT"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="lg"
                  h={12}
                  fontSize="sm"
                  _hover={{
                    borderColor: 'teal.300',
                  }}
                  _focus={{
                    bg: inputFocusBg,
                    borderColor: 'teal.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-teal-500)',
                  }}
                />
              </Box>

              <Box w="full">
                <Flex align="center" gap={2} mb={2}>
                  <Icon color={iconColor} boxSize={4}>
                    <LuLock />
                  </Icon>
                  <Text fontSize="sm" fontWeight="medium" color={headingColor}>
                    Contraseña
                  </Text>
                </Flex>
                <Input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={inputBg}
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="lg"
                  h={12}
                  fontSize="sm"
                  _hover={{
                    borderColor: 'teal.300',
                  }}
                  _focus={{
                    bg: inputFocusBg,
                    borderColor: 'teal.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-teal-500)',
                  }}
                />
              </Box>

              <Button
                w="full"
                h={12}
                bg="teal.500"
                color="white"
                fontSize="sm"
                fontWeight="semibold"
                borderRadius="lg"
                onClick={handleSubmit}
                _hover={{
                  bg: 'teal.600',
                  transform: 'translateY(-1px)',
                  shadow: 'lg',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s"
              >
                Iniciar Sesión
              </Button>
            </VStack>

            {/* Footer */}
            <Flex align="center" mt={8} mb={4}>
              <Divider />
              <Text px={3} fontSize="xs" color={subtitleColor} whiteSpace="nowrap">
                Acceso seguro
              </Text>
              <Divider />
            </Flex>

            <Text fontSize="xs" color={subtitleColor} textAlign="center">
              Protegemos tu información con encriptación de nivel empresarial
            </Text>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
};

export default Login;