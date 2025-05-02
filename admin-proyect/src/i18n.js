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
          'title': 'Welcome to Alphima',
          'subtitle': 'Start managing from the comfort of your home with ALPHIMA',
          'month': 'month',
          'email': 'Email',
          'password': 'Password',
          'name': 'Name',
          'enter': 'Enter',
          'login': 'Sign in',
          'register': 'Sign up',
          'dontHaveAccount': 'Don\'t have an account?',
          'alreadyHaveAccount': 'Already have an account?',
          'forgotPassword': 'Forgot Password?',
          'terms': 'Terms and Conditions',
          'welcome': 'Welcome ALPHIMA',
          'Month': '/month'
        }
      },
      es: {
        translation: {
          'title': 'Bienvenido a Alphima',
          'subtitle': 'Empieza a gestionar desde la comodidad de tu casa con ALPHIMA',
          'month': 'mes',
          'email': 'Correo',
          'password': 'Contraseña',
          'name': 'Nombre',
          'enter': 'Ingresar',
          'login': 'Ingresar',
          'register': 'Registrar',
          'dontHaveAccount': '¿No tienes una cuenta?',
          'alreadyHaveAccount': '¿Ya tienes una cuenta?',
          'forgotPassword': '¿Olvidaste tu contraseña?',
          'terms': 'Términos y condiciones',
          'welcome': 'Bienvenido ALPHIMA',
          'Month': '/mes'
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
