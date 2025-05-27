import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Card, 
  Container, 
  VStack, 
  Flex, 
  Icon, 
  Separator as Divider,
  Spinner
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useAuthStore } from '../stores/useAuthStore';
import { LuUser, LuIdCard, LuLogOut } from 'react-icons/lu';

const Profile: React.FC = () => {
  const { profile, logout } = useAuthStore();

  const bgGradient = useColorModeValue(
    'linear(to-br, teal.50, blue.50, purple.50)',
    'linear(to-br, gray.900, teal.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('gray.700', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const iconColor = useColorModeValue('teal.500', 'teal.300');

  if (!profile) {
    return (
      <Box 
        bgGradient={bgGradient} 
        minH="100vh" 
        display="flex" 
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap={4}>
          <Spinner 
            size="xl" 
            color="teal.500" 
          />
          <Text color={textColor} fontSize="lg">
            Cargando perfil...
          </Text>
        </VStack>
      </Box>
    );
  }

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
                w={16}
                h={16}
                bg="teal.500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={2}
              >
                <Icon color="white" boxSize={8}>
                  <LuUser />
                </Icon>
              </Box>
              <Heading 
                size="xl" 
                color={headingColor}
                fontWeight="bold"
                letterSpacing="tight"
              >
                Mi Perfil
              </Heading>
              <Text color={labelColor} fontSize="sm">
                Información de tu cuenta
              </Text>
            </VStack>

            {/* Profile Info */}
            <VStack gap={6} mb={8}>
              <Box w="full">
                <Flex align="center" gap={3} mb={3}>
                  <Icon color={iconColor} boxSize={5}>
                    <LuUser />
                  </Icon>
                  <Text fontSize="sm" fontWeight="semibold" color={labelColor} textTransform="uppercase" letterSpacing="wide">
                    Nombre Completo
                  </Text>
                </Flex>
                <Box
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  p={4}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontSize="lg" fontWeight="medium" color={headingColor}>
                    {profile.name}
                  </Text>
                </Box>
              </Box>

              <Box w="full">
                <Flex align="center" gap={3} mb={3}>
                  <Icon color={iconColor} boxSize={5}>
                    <LuIdCard />
                  </Icon>
                  <Text fontSize="sm" fontWeight="semibold" color={labelColor} textTransform="uppercase" letterSpacing="wide">
                    RUT
                  </Text>
                </Flex>
                <Box
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  p={4}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={borderColor}
                >
                  <Text fontSize="lg" fontWeight="medium" color={headingColor}>
                    {profile.rut}
                  </Text>
                </Box>
              </Box>
            </VStack>

            {/* Divider */}
            <Divider mb={6} />

            {/* Actions */}
            <VStack gap={3}>
              <Button
                w="full"
                h={12}
                bg="red.500"
                color="white"
                fontSize="sm"
                fontWeight="semibold"
                borderRadius="lg"
                onClick={logout}

                _hover={{
                  bg: 'red.600',
                  transform: 'translateY(-1px)',
                  shadow: 'lg',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s"
              >
                Cerrar Sesión
              </Button>
              
              <Text fontSize="xs" color={labelColor} textAlign="center" mt={2}>
                Tu sesión se cerrará de forma segura
              </Text>
            </VStack>
          </Card.Body>
        </Card.Root>
        <p>{profile.id}</p>
      </Container>
    </Box>
  );
};

export default Profile;