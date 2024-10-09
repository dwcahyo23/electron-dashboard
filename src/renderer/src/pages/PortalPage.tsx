// src/pages/PortalPage.tsx

import { Button, Card, Flex, Grid, Image, Text, Title, useMantineTheme } from '@mantine/core'
import { createStyles } from '@mantine/emotion'
import { IconChartLine, IconCheck, IconEye, IconTools } from '@tabler/icons-react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import backgroundImageUrl from '../assets/iot-background.jpg'

// RGBA Conversion Function
const hexToRgba = (hex: string, alpha: number) => {
  hex = hex.replace(/^#/, '')
  let r: number, g: number, b: number

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const useStyles = createStyles((theme) => ({
  container: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative'
    // backgroundColor: theme.colors.dark[7]
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: -1
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing.md,
    height: '100%'
  },
  title: {
    color: theme.white,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
    fontWeight: 700
  },
  card: {
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows.md
    }
  },
  cardIcon: {
    marginBottom: theme.spacing.sm
  },
  logoutButton: {
    marginTop: theme.spacing.xl
  }
}))

interface PortalCardProps {
  title: string
  description: string
  to: string
  icon: React.ReactNode
  backgroundColor: string
}

const PortalCard: React.FC<PortalCardProps> = ({
  title,
  description,
  to,
  icon,
  backgroundColor
}) => {
  const { classes } = useStyles()
  return (
    <Card
      component={Link}
      to={to}
      padding="lg"
      shadow="sm"
      className={classes.card}
      style={{ backgroundColor }}
      aria-label={`Akses aplikasi ${title}`}
    >
      <Flex direction="column" align="center" justify="center" style={{ height: '100%' }}>
        <div className={classes.cardIcon}>{icon}</div>
        <Text size="lg" fw={500}>
          {title}
        </Text>
        <Text color="white" size="sm">
          {description}
        </Text>
      </Flex>
    </Card>
  )
}

const PortalPage = () => {
  const navigate = useNavigate()
  const { classes } = useStyles()
  const theme = useMantineTheme()

  const handleLogout = async () => {
    try {
      await window.api.removeAccessToken()
      delete axios.defaults.headers.common['Authorization']
      await window.api.setLoginStatus(false)
      await window.api.removeUserData()
      navigate('/Login')
    } catch (error) {
      console.error('Logout failed:', error)
      // Optionally, display an error notification to the user
    }
  }

  return (
    <div className={classes.container}>
      {/* Background Image */}
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
      <div className={classes.overlay} />

      {/* Main Content */}
      <Flex direction="column" justify="center" align="center" className={classes.content}>
        <Title order={2} className={classes.title}>
          Selamat Datang di Portal Aplikasi IOT
        </Title>

        <Grid
          justify="center"
          align="flex-start"
          gutter="md"
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
            <PortalCard
              title="OEEInsight"
              description="Akses aplikasi OEE"
              to="/app-apq"
              icon={<IconChartLine size={32} color={theme.colors.blue[6]} />}
              backgroundColor={hexToRgba(theme.colors.blue[6], 0.8)} // Use the conversion function
            />
          </Grid.Col>

          <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
            <PortalCard
              title="MN WorkOrder"
              description="Akses aplikasi maintenance work order"
              // to="/maintenance-workorder"
              to=""
              icon={<IconTools size={32} color={theme.colors.green[6]} />}
              backgroundColor={hexToRgba(theme.colors.green[6], 0.8)} // Use the conversion function
            />
          </Grid.Col>

          <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
            <PortalCard
              title="ToolMonitor"
              description="Akses aplikasi live time tool monitor"
              // to="/tool-monitor"
              to=""
              icon={<IconEye size={32} color={theme.colors.teal[6]} />}
              backgroundColor={hexToRgba(theme.colors.teal[6], 0.8)} // Use the conversion function
            />
          </Grid.Col>

          <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
            <PortalCard
              title="OKGuard - QSense"
              description="Akses aplikasi QC judgment OK/NG"
              // to="/okguard-qsense"
              to=""
              icon={<IconCheck size={32} color={theme.colors.red[6]} />}
              backgroundColor={hexToRgba(theme.colors.red[6], 0.8)} // Use the conversion function
            />
          </Grid.Col>
        </Grid>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          color="red"
          variant="outline"
          size="md"
          className={classes.logoutButton}
        >
          Logout
        </Button>
      </Flex>
    </div>
  )
}

export default PortalPage
