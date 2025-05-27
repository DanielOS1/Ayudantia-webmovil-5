import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useAuthStore } from '../stores/useAuthStore';

const Profile: React.FC = () => {
  const { profile, logout } = useAuthStore();

if (!profile) {
  return (
    <Box textAlign="center" mt={20}>
      <Text>Cargando perfil...</Text>
    </Box>
  );
}


  return (
    <Box maxW="md" mx="auto" mt={20} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={4}>Perfil</Heading>
      <Text><strong>Nombre:</strong> {profile.name}</Text>
      <Text><strong>RUT:</strong> {profile.rut}</Text>
      <Button mt={4} colorScheme="teal" onClick={logout}>
        Cerrar sesión
      </Button>
    </Box>
  );
};

export default Profile;
