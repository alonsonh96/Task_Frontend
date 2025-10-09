// =====================================
// 1. DICCIONARIO COMPLETO (Errores + Éxitos)
// =====================================

export const MESSAGE_TRANSLATIONS: Record<string | number, string> = {
    
    // ===== FALLBACKS POR STATUS HTTP =====
    200: 'Operación completada',
    201: 'Creado exitosamente',
    202: 'Solicitud aceptada',
    204: 'Operación completada',
    400: 'Solicitud incorrecta',
    401: 'Sesión expirada. Inicia sesión nuevamente',
    403: 'Acceso denegado',
    404: 'No encontrado',
    409: 'Conflicto de datos',
    422: 'Datos no válidos',
    500: 'Error interno del servidor',
    503: 'Servicio no disponible',

    // ====== GENERALES ======
    INVALID_OR_EXPIRED_TOKEN: "El token es inválido o ha expirado",
    UNAUTHORIZED_ACTION: "No tienes permisos para realizar esta acción",
    USER_NOT_FOUND: "Usuario no encontrado",
    VALIDATION_REQUIRED_FIELDS: "Faltan campos obligatorios",
    ACCOUNT_REQUEST_CONFIRMATION_RATE_LIMITED: "Ya se envió un código de confirmación recientemente. Revisa tu correo o inténtalo más tarde",
    

    // ***** AUTH_CONTROLLER *****
    // === REGISTRO DE USUARIO ===
    ACCOUNT_EMAIL_ALREADY_REGISTERED: "Ya existe una cuenta registrada con este correo electrónico",
    ACCOUNT_CREATE_SUCCESS: "Cuenta creada con éxito. Revisa tu correo para confirmarla",
    ACCOUNT_CREATE_FAILED: "No pudimos crear tu cuenta. Intenta más tarde",

    // --- CONFIRMAR CUENTA ---
    ACCOUNT_CONFIRMATION_TOKEN_REQUIRED: "El token de confirmación es obligatorio",
    ACCOUNT_CONFIRMATION_INVALID_TOKEN: "El token de confirmación es inválido o ha expirado",
    ACCOUNT_CONFIRMATION_USER_NOT_FOUND: "No se encontró el usuario asociado a este token",
    ACCOUNT_CONFIRMATION_ALREADY_CONFIRMED: "La cuenta ya estaba confirmada",
    ACCOUNT_CONFIRMATION_SUCCESS: "Cuenta confirmada con éxito",
    ACCOUNT_CONFIRMATION_FAILED: "No pudimos confirmar la cuenta. Intenta más tarde",

    // --- LOGIN DE USUARIO ---
    ACCOUNT_LOGIN_REQUIRED_FIELDS: "El email y la contraseña son obligatorios",
    ACCOUNT_LOGIN_USER_NOT_FOUND: "Usuario no encontrado",
    ACCOUNT_LOGIN_INVALID_CREDENTIALS: "El email o la contraseña no son válidos",
    ACCOUNT_LOGIN_NOT_CONFIRMED: "Debes confirmar tu cuenta antes de iniciar sesión",
    ACCOUNT_LOGIN_SUCCESS: "Inicio de sesión exitoso",

    // --- SOLICITUD DE CONFIRMACIÓN ---
    ACCOUNT_REQUEST_CONFIRMATION_REQUIRED_EMAIL: "El email es obligatorio",
    ACCOUNT_REQUEST_CONFIRMATION_USER_NOT_FOUND: "El usuario no está registrado",
    ACCOUNT_REQUEST_CONFIRMATION_ALREADY_CONFIRMED: "El usuario ya está confirmado",
    ACCOUNT_REQUEST_CONFIRMATION_SENT: "Se ha enviado un nuevo código de confirmación a tu correo",

    // --- RECUPERAR CONTRASEÑA ---
    ACCOUNT_FORGOT_PASSWORD_REQUIRED_EMAIL: "El email es obligatorio",
    ACCOUNT_FORGOT_PASSWORD_GENERIC: "Si tu correo está registrado, recibirás las instrucciones para restablecer tu contraseña",
    ACCOUNT_FORGOT_PASSWORD_RATE_LIMITED: "Ya se envió un código de restablecimiento recientemente. Revisa tu correo o inténtalo más tarde",

       // --- VALIDACIÓN DE TOKEN (RESET PASSWORD) ---
    ACCOUNT_VALIDATE_TOKEN_REQUIRED: "El token es obligatorio",
    //ACCOUNT_VALIDATE_TOKEN_INVALID_OR_EXPIRED: "El token es inválido o ha expirado",
    ACCOUNT_VALIDATE_TOKEN_SUCCESS: "El token es válido, ahora puedes establecer tu nueva contraseña",

  // --- RESET DE CONTRASEÑA CON TOKEN ---
    ACCOUNT_RESET_TOKEN_REQUIRED: "El token es obligatorio",
    ACCOUNT_RESET_PASSWORD_REQUIRED: "La nueva contraseña es obligatoria",
    //ACCOUNT_RESET_TOKEN_INVALID_OR_EXPIRED: "El token es inválido o ha expirado",
    ACCOUNT_RESET_USER_NOT_FOUND: "El usuario asociado a este token ya no existe",
    ACCOUNT_RESET_PASSWORD_FAILED: "No se pudo actualizar la contraseña. Intenta nuevamente más tarde",
    ACCOUNT_RESET_PASSWORD_SUCCESS: "Tu contraseña ha sido actualizada exitosamente. Ahora puedes iniciar sesión con la nueva contraseña",

     // --- REFRESH TOKEN ---
    TOKEN_REFRESH_REQUIRED: "El refresh token es obligatorio",
    TOKEN_REFRESH_INVALID: "El refresh token es inválido o ha expirado",
    TOKEN_REFRESH_SUCCESS: "El token de acceso ha sido renovado correctamente",

    // --- GET USER ---
    USER_FETCH_SUCCESS: "Usuario obtenido correctamente",
    USER_FETCH_FAILED: "No se pudo obtener la información del usuario",

    // --- LOGOUT ---
    LOGOUT_SUCCESS: "Sesion finalizada correctamente",

      // --- ENVÍO DE EMAIL ---
    EMAIL_SEND_FAILED: "No se pudo enviar el correo. Inténtalo más tarde",

    // --- ACTUALIZAR PERFIL ---
    EMAIL_ALREADY_IN_USE: "Este correo electrónico ya está en uso",
    ACCOUNT_PROFILE_UPDATED_SUCCESS: "Perfil actualizado correctamente",

    // --- ACTUALIZAR CONTRASEÑA ---
    INCORRECT_CURRENT_PASSWORD: "La contraseña actual es incorrecta",
    PASSWORD_MUST_BE_DIFFERENT: "La nueva contraseña debe ser diferente de la actual",
    ACCOUNT_PASSWORD_CHANGED: "Tu contraseña fue cambiada correctamente.",

    // ***** AUTHENTICATION MIDDLEWARE *****
    ACCESS_TOKEN_REQUIRED: "El token de acceso es obligatorio",
    MISSING_JWT_SECRET: "Error de configuración del servidor (falta JWT_SECRET)",
    INVALID_TOKEN_PAYLOAD: "El token es inválido o no contiene la información del usuario",

    // ***** NOTES *****
    NOTE_CREATE_SUCCESS: "Nota creada correctamente",
    NOTE_CREATE_FAILED: "No se pudo crear la nota. Inténtalo más tarde",
    NOTE_NOT_FOUND: "Nota no encontrada",
    NOTE_DELETE_FAILED: "No se pudo eliminar la nota. Inténtalo más tarde",
    NOTE_DELETE_SUCCES: "Nota eliminada correctamente",

    // ***** PROJECTS *****
    PROJECT_VALIDATION_REQUIRED_FIELDS: "El nombre del proyecto, cliente y descripción son obligatorios",
    PROJECT_UNAUTHORIZED: "Usuario no autorizado",
    PROJECTS_NOT_FOUND: "No se encontraron proyectos para este usuario",
    PROJECTS_FETCH_SUCCESS: "Proyectos obtenidos correctamente",
    PROJECT_CREATE_SUCCESS: "Proyecto creado correctamente",
    PROJECT_UPDATE_SUCCESS: "Proyecto actualizado correctamente",
    PROJECT_DELETE_SUCCESS: "Proyecto eliminado correctamente",
    PROJECT_DELETE_FAILED: "No se pudo eliminar el proyecto",

    // ***** TASK *****
    TASK_VALIDATION_REQUIRED_FIELDS: "Todos los campos de la tarea son obligatorios",
    TASK_FETCH_SUCCESS: "Tarea obtenida correctamente",
    TASK_CREATE_SUCCESS: "La tarea se creó correctamente",
    TASK_UPDATE_SUCCESS: "La tarea se actualizó correctamente",
    TASK_DELETE_SUCCESS: "La tarea se eliminó correctamente",
    TASK_NOT_FOUND: "No se encontro la tarea",
    TASK_NOT_IN_PROJECT: "La tarea no pertenece a este proyecto",
    TASK_STATUS_UPDATE_SUCCESS: "El estado de la tarea se actualizó correctamente",

    // ***** TEAM_MEMBER *****
    TEAM_MEMBER_NOT_FOUND: "Usuario no encontrado",
    TEAM_MEMBER_FETCH_SUCCESS: "Usuario encontrado correctamente",
    TEAM_MEMBER_ALREADY_EXISTS: "El usuario ya es miembro de este proyecto",
    TEAM_MEMBER_ADD_SUCCESS: "Usuario agregado correctamente al proyecto",
    TEAM_MEMBER_REMOVE_SUCCESS: "Usuario eliminado correctamente del proyecto",
    TEAM_MEMBERS_FETCH_SUCCESS: "Lista de miembros obtenida correctamente",
    TEAM_MEMBER_NOT_IN_PROJECT: "El usuario no es miembro de este proyecto",
    TEAM_MEMBER_SELF_ADD_NOT_ALLOWED: "No puedes agregarte a ti mismo al equipo",

    // ****** RATE_LIMIT *****
    AUTH_RATE_LIMITED: "Demasiados intentos de autenticación. Inténtalo de nuevo en 15 minutos.",
    PASSWORD_RATE_LIMITED: "Demasiados intentos de cambio de contraseña. Inténtalo en una hora.",
    PROFILE_RATE_LIMITED: "Demasiadas actualizaciones de perfil. Inténtalo en una hora.",

    // ***** VALIDATORS 
    EMAIL_INVALID: "El correo no es válido",
    PASSWORD_REQUIRED: "La contraseña es obligatoria",
    PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 8 caracteres",
    PASSWORD_MISMATCH: "Las contraseñas no coinciden",
    NAME_REQUIRED: "El nombre es obligatorio",
    NAME_LENGTH_INVALID: "El nombre debe tener entre 2 y 50 caracteres",
    TOKEN_REQUIRED: "El token es obligatorio",

} as const;


export const translateResponse = (payload: any, isError: boolean = false): string => {
    // 1. Mensaje por messageCode
    const code = payload?.response?.data?.messageCode 
              || payload?.messageCode 
              || payload?.data?.messageCode;

    if (code && MESSAGE_TRANSLATIONS[code]) {
        return MESSAGE_TRANSLATIONS[code];
    }

    // 2. Mensaje de error (network, timeout, etc.)
    if (isError) {
        const rawMessage = payload?.message || "";
        const lowerMessage = rawMessage.toLowerCase();

        if (lowerMessage.includes("network") || lowerMessage.includes("fetch")) {
            return "Error de conexión. Verifica tu internet.";
        }
        if (lowerMessage.includes("timeout")) {
            return "La operación tardó demasiado. Intenta de nuevo.";
        }
    }

    // 3. Status HTTP
    const status = payload?.response?.statusCode
    if (status && MESSAGE_TRANSLATIONS[status]) {
        return MESSAGE_TRANSLATIONS[status];
    }

    // 4. Fallback
    return isError
        ? "Ha ocurrido un error. Por favor, intenta de nuevo."
        : "Operación completada correctamente";
};