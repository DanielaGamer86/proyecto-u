import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          login: 'Log in',
          register: 'Sign up',
          welcome: 'Welcome to Alphima',
          subtitle: 'Manage everything from one place',
          basic: 'Basic',
          pro: 'Pro',
          enterprise: 'Enterprise',
          planDescription: 'Plan description',
          select: 'Select',
          features: 'Included features:',
          chooseplan: 'Choose plan',
          cancel: 'Cancel',
          custom: 'Custom price',
          perMonth: '/month'
        }
      },
      es: {
        translation: {
          login: 'Iniciar sesión',
          register: 'Registrarse',
          welcome: 'Bienvenido a Alphima',
          subtitle: 'Gestiona todo desde un solo lugar',
          basic: 'Básico',
          pro: 'Pro',
          enterprise: 'Empresarial',
          planDescription: 'Descripción del plan',
          select: 'Seleccionar',
          features: 'Características incluidas:',
          chooseplan: 'Elegir plan',
          cancel: 'Cancelar',
          custom: 'A medida',
          perMonth: '/mes'
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
