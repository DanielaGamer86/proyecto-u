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
          "phone": "Phone",
          'password': 'Password',
          "Confirm Password": "Confirm Password",
          'name': 'Name',
          'enter': 'Enter',
          'login': 'Sign in',
          'register': 'Sign up',
          'dontHaveAccount': 'Don\'t have an account?',
          'alreadyHaveAccount': 'Already have an account?',
          'forgotPassword': 'Forgot Password?',
          'terms': 'Terms and Conditions',
          'welcome': 'Welcome ALPHIMA',
          'Month': '/month',
          'passwordsDoNotMatch': 'Passwords do not match',
          'passwordRequirements': 'Password must be at least 7 characters long and include uppercase, lowercase, number and special character (@ _ -)',
          'registrationError': 'Error during registration',
          'serverError': 'Server error, please try again',
          'emailExists': 'Email is already registered'
        }
      },
      es: {
        translation: {
          'title': 'Bienvenido a Alphima',
          'subtitle': 'Empieza a gestionar desde la comodidad de tu casa con ALPHIMA',
          'month': 'mes',
          'email': 'Correo',
          "phone": "Teléfono",
          'password': 'Contraseña',
          "Confirm Password": "Confirmar contraseña",
          'name': 'Nombre',
          'enter': 'Ingresar',
          'login': 'Ingresar',
          'register': 'Registrar',
          'dontHaveAccount': '¿No tienes una cuenta?',
          'alreadyHaveAccount': '¿Ya tienes una cuenta?',
          'forgotPassword': '¿Olvidaste tu contraseña?',
          'terms': 'Términos y condiciones',
          'welcome': 'Bienvenido ALPHIMA',
          'Month': '/mes',
          'passwordsDoNotMatch': 'Las contraseñas no coinciden',
          'passwordRequirements': 'La contraseña debe tener al menos 7 caracteres e incluir mayúsculas, minúsculas, números y caracteres especiales (@ _ -)',
          'registrationError': 'Error durante el registro',
          'serverError': 'Error del servidor, por favor intente de nuevo',
          'emailExists': 'El correo ya está registrado'
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
