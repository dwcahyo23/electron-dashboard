// src/pages/PortalPage.tsx

import { Button, Card, Flex, Grid, Image, Text, Title } from '@mantine/core'
import axios from 'axios' // Ensure axios is imported
import { Link, useNavigate } from 'react-router-dom'
import backgroundImageUrl from '../assets/iot-background.jpg'

const PortalPage = () => {
  const navigate = useNavigate() // Use useNavigate for navigation

  const handleLogout = async () => {
    await window.api.removeAccessToken()
    delete axios.defaults.headers.common['Authorization']
    await window.api.setLoginStatus(false)
    await window.api.removeUserData()
    navigate('/Login')
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Full-Width and Full-Height Background Image */}
      <Image
        src={backgroundImageUrl}
        alt="Manufacturing Background"
        fit="cover" // Ensures the image covers the area without distortion
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Send the image to the back
          filter: 'blur(2px)' // Apply blur effect to the image
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay with transparency
          zIndex: 0 // Ensure it stays above the image but below the text
        }}
      />

      <Flex
        direction="column"
        justify="center"
        align="center"
        style={{ height: '100%', padding: '20px', position: 'relative', zIndex: 1 }}
      >
        <Title
          order={2}
          mb="lg"
          style={{ color: '#fff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)' }}
        >
          Selamat Datang di Portal Aplikasi IOT
        </Title>

        <Grid
          justify="center"
          align="flex-start"
          gutter="md"
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          {/* Kolom 1 */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Card
              component={Link}
              to="/app-apq"
              padding="lg"
              shadow="sm"
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: 'rgba(227, 242, 253, 0.8)', // Light blue background with transparency
                color: '#212529', // Dark color
                transition: 'transform 0.3s',
                height: '150px', // Fixed height
                marginBottom: '20px', // Spacing below the card
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px' // Rounded corners for the card
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Text size="lg" fw={500}>
                APQ
              </Text>
              <Text color="dimmed">Akses aplikasi APQ Anda</Text>
            </Card>
          </Grid.Col>

          {/* Kolom 2 */}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Card
              component={Link}
              to="/app-other" // Ganti dengan route aplikasi lain jika ada
              padding="lg"
              shadow="sm"
              style={{
                width: '100%',
                textAlign: 'center',
                backgroundColor: 'rgba(200, 230, 201, 0.8)', // Light green background with transparency
                color: '#212529', // Dark color
                transition: 'transform 0.3s',
                height: '150px', // Fixed height
                marginBottom: '20px', // Spacing below the card
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px' // Rounded corners for the card
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Text size="lg" fw={500}>
                Aplikasi Lain
              </Text>
              <Text color="dimmed">Akses aplikasi lainnya</Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          color="red"
          variant="outline"
          style={{ marginTop: '20px' }} // Margin for spacing
        >
          Logout
        </Button>
      </Flex>
    </div>
  )
}

export default PortalPage
