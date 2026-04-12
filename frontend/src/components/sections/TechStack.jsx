// TechStack.jsx
import { Container, Typography, Box, Stack, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  SiReact,
  SiJavascript,
  SiRedux,
  SiPython,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiMui,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiTerraform,
  SiRedis,
  SiGit,
  SiShopify,
  SiGithub,
  SiVercel,
  SiLinux,
  SiN8N,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const technologies = [
  // Frontend
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'Material UI', icon: SiMui, color: '#007FFF' },
  
  // Backend
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Django', icon: SiDjango, color: '#0C4B33' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
  
  // Databases
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  
  // Cloud & Infrastructure
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624' },
  
  // Tools & Platforms
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#E6E8EE' },
  { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
  { name: 'Shopify', icon: SiShopify, color: '#96BF48' },
  { name: 'n8n', icon: SiN8N, color: '#EA4B71' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const TechStack = () => {
  const { t } = useTranslation('common');

  return (
    <Box id="techstack" sx={{ py: { xs: 8, md: 12 }, background: (theme) => theme.palette.background.paper }}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <Stack spacing={2} sx={{ mb: 6, textAlign: 'center', alignItems: 'center' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {t('techStack.title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
              {t('techStack.subtitle')}
            </Typography>
          </Stack>
        </motion.div>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            maxWidth: 900,
            mx: 'auto',
            justifyContent: 'center',
          }}
        >
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <Paper
                component={motion.div}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow: `0 12px 32px ${tech.color}30`,
                  borderColor: tech.color,
                }}
                key={tech.name}
                elevation={0}
                sx={{
                  p: 3,
                  width: { xs: 'calc(50% - 12px)', sm: 'calc(33.333% - 16px)', md: 'calc(25% - 18px)' },
                  minWidth: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1.5,
                  background: 'rgba(8, 10, 24, 0.5)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2,
                    background: `${tech.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Icon size={28} color={tech.color} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, textAlign: 'center' }}>
                  {tech.name}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default TechStack;
