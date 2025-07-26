# Database Seeds

Este directorio contiene los archivos de seed para poblar la base de datos con datos de ejemplo.

## 🚀 Ejecución Automática

Los seeds se ejecutan **automáticamente** al iniciar la aplicación si la variable de entorno `AUTO_SEED=true` está configurada (por defecto está habilitada).

### Control de Ejecución Automática

En el archivo `.env`:
```bash
# Habilitar seeds automáticos (por defecto)
AUTO_SEED=true

# Deshabilitar seeds automáticos
AUTO_SEED=false
```

## Archivos de Seed

### 1. UserSeeds.js
**Datos de ejemplo:** 8 doctores/usuarios del sistema
- Dr. María González
- Dr. Carlos Rodríguez
- Dr. Ana Martínez
- Dr. Luis Hernández
- Dr. Patricia López
- Dr. Roberto García
- Dr. Carmen Fernández
- Dr. Javier Moreno

### 2. PatientSeeds.js
**Datos de ejemplo:** 8 pacientes con información médica completa
- Juan Carlos Pérez (Hipertensión, diabetes)
- Ana Sofía García (Asma leve)
- Miguel Ángel López (Artritis reumatoide)
- Carmen Elena Martínez (Hipertensión, osteoporosis)
- Roberto José Fernández (Sin antecedentes)
- Patricia Isabel González (Migrañas crónicas)
- Luis Alberto Rodríguez (Colesterol alto)
- Elena María Moreno (Depresión, ansiedad)

### 3. MedicalCenterSeeds.js
**Datos de ejemplo:** 8 centros médicos en diferentes ciudades españolas
- Centro Médico Madrid Central
- Clínica Barcelona Salud
- Hospital Valencia Médico
- Centro de Salud Sevilla
- Clínica Bilbao Especializada
- Centro Médico Málaga Costa
- Hospital Alicante General
- Clínica Granada Alhambra

### 4. PrescriptionSeeds.js
**Datos de ejemplo:** 12 prescripciones médicas variadas
- Medicamentos comunes: Paracetamol, Ibuprofeno, Omeprazol
- Antibióticos: Amoxicilina
- Medicamentos crónicos: Metformina, Enalapril, Sertralina
- Inhaladores: Salbutamol
- Suplementos: Calcio + Vitamina D

### 5. DiagnosticSeeds.js
**Datos de ejemplo:** 12 diagnósticos médicos realistas
- Condiciones crónicas: Hipertensión, Diabetes, Asma
- Enfermedades reumáticas: Artritis reumatoide
- Problemas digestivos: Gastritis crónica
- Condiciones neurológicas: Migraña, Insomnio
- Problemas cardiovasculares: Hipercolesterolemia
- Salud mental: Depresión mayor
- Infecciones: Infección respiratoria aguda
- Condiciones óseas: Osteoporosis
- Alergias: Alergia estacional

## Cómo ejecutar los seeds

### 🎯 Ejecución Automática (Recomendado)
Los seeds se ejecutan automáticamente al iniciar la aplicación:

```bash
# Desarrollo con seeds automáticos
npm run dev

# Producción con seeds automáticos
npm start
```

### 🔧 Ejecución Manual

#### Opción 1: Usando npm script
```bash
npm run seed
```

#### Opción 2: Ejecutando directamente
```bash
npx babel-node src/database/seedDatabase.js
```

#### Opción 3: Desde el código
```javascript
import seedDatabase from './src/database/seedDatabase';
await seedDatabase();
```

### 🚫 Ejecutar sin seeds automáticos

#### Desarrollo sin seeds automáticos
```bash
npm run dev:no-seed
```

#### Producción sin seeds automáticos
```bash
npm run start:no-seed
```

#### Deshabilitar temporalmente
```bash
AUTO_SEED=false npm run dev
```

## Orden de ejecución

Los seeds se ejecutan en el siguiente orden para respetar las restricciones de claves foráneas:

1. **Users** - Se crean primero los doctores
2. **Patients** - Luego los pacientes
3. **Medical Centers** - Centros médicos (requieren userId)
4. **Prescriptions** - Prescripciones (requieren patientId y prescribedBy)
5. **Diagnostics** - Diagnósticos (requieren patientId y doctorId)

## Características de los datos

### Realismo médico
- Los diagnósticos incluyen síntomas, tratamientos y notas médicas realistas
- Las prescripciones tienen dosis, frecuencias e instrucciones apropiadas
- Los pacientes tienen historiales médicos variados y realistas

### Diversidad geográfica
- Centros médicos en 8 ciudades españolas diferentes
- Direcciones y contactos realistas

### Relaciones coherentes
- Los pacientes tienen múltiples diagnósticos y prescripciones
- Los doctores están asignados a centros médicos específicos
- Las fechas de diagnóstico y prescripción son coherentes

## Notas importantes

- Los seeds usan `findOrCreate` para evitar duplicados
- Los datos se pueden ejecutar múltiples veces de forma segura
- Las relaciones entre entidades están correctamente establecidas
- Los datos incluyen casos de diferentes severidades y estados
- **Los seeds se ejecutan automáticamente en cada reinicio del servidor** (si AUTO_SEED=true)

## Personalización

Para agregar más datos de ejemplo:

1. Agrega nuevos objetos al array de datos en el archivo correspondiente
2. Asegúrate de que las claves foráneas existan
3. Los cambios se aplicarán automáticamente en el próximo reinicio del servidor

Los seeds están diseñados para ser extensibles y fáciles de modificar según las necesidades del proyecto.

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Desarrollo con seeds automáticos |
| `npm run dev:no-seed` | Desarrollo sin seeds automáticos |
| `npm start` | Producción con seeds automáticos |
| `npm run start:no-seed` | Producción sin seeds automáticos |
| `npm run seed` | Ejecutar seeds manualmente |
| `npm run seed:force` | Ejecutar seeds con opciones adicionales |
| `npm run test:db` | Probar conexión y modelos de base de datos |
| `npm run test:patient` | Probar creación de pacientes con userId |
| `npm run test:relationships` | Probar todas las relaciones entre modelos |
| `npm run test:diagnostic` | Probar creación de diagnósticos con doctorId |

## 🔧 Solución de Problemas

### Error: "SequelizeEagerLoadingError"

Si encuentras este error al hacer GET requests a endpoints como `/medical-centers`, significa que hay un problema con las relaciones entre modelos:

1. **Probar todas las relaciones:**
   ```bash
   npm run test:relationships
   ```

2. **Verificar que las relaciones estén correctamente definidas:**
   - Las relaciones deben estar definidas en `src/database/models.js`
   - Los servicios deben usar los alias correctos (o sin alias si no están definidos)

3. **Problemas comunes:**
   - Usar alias `'User'` cuando la relación no tiene alias definido
   - Usar atributos incorrectos (ej: `'name'` en lugar de `'firstName'`, `'lastName'`)
   - Relaciones duplicadas o conflictivas

4. **Soluciones:**
   ```javascript
   // ❌ Incorrecto - usando alias que no existe
   include: [{
     model: User,
     as: 'User',  // Este alias no está definido
     attributes: ['id', 'name', 'email']
   }]
   
   // ✅ Correcto - sin alias
   include: [{
     model: User,
     attributes: ['id', 'firstName', 'lastName', 'email']
   }]
   
   // ✅ Correcto - con alias definido
   include: [{
     model: User,
     as: 'Doctor',  // Este alias está definido
     attributes: ['id', 'firstName', 'lastName', 'email']
   }]
   ```

### Error: doctorId es null en diagnósticos

Si el campo `doctorId` aparece como `null` al crear diagnósticos:

1. **Verificar que el campo doctorId esté definido en el modelo:**
   - El modelo `diagnostics.js` debe tener el campo `doctorId` explícitamente definido
   - Verificar que las relaciones estén correctamente establecidas

2. **Probar creación de diagnósticos:**
   ```bash
   npm run test:diagnostic
   ```

3. **Verificar datos de seed:**
   - Asegurarse de que todos los diagnósticos en `DiagnosticSeeds.js` tengan `doctorId`
   - Verificar que el `doctorId` corresponda a un usuario existente
   - Verificar que el `patientId` corresponda a un paciente existente

4. **Verificar relaciones en el código:**
   ```javascript
   // En el controlador, asegurarse de incluir doctorId
   const newDiagnostic = {
     ...req.body,
     doctorId: req.body.doctorId || req.user.id // o el ID del doctor actual
   };
   ```

### Error: "relation 'users' does not exist"

Si encuentras este error, significa que hay un problema con la sincronización de la base de datos. Prueba estos pasos:

1. **Probar conexión y modelos:**
   ```bash
   npm run test:db
   ```

2. **Forzar sincronización completa:**
   ```bash
   # En .env, cambiar:
   FORCE_SYNC=true
   # Luego ejecutar:
   npm run dev
   ```

3. **Limpiar y reiniciar:**
   ```bash
   # Detener contenedores
   docker-compose down
   
   # Eliminar volúmenes de base de datos
   docker-compose down -v
   
   # Reiniciar
   docker-compose up
   ```

4. **Ejecutar seeds manualmente después de sincronizar:**
   ```bash
   npm run seed
   ```

### Error: userId es null en pacientes

Si el campo `userId` aparece como `null` al crear pacientes:

1. **Verificar que el campo userId esté definido en el modelo:**
   - El modelo `patients.js` debe tener el campo `userId` explícitamente definido
   - Verificar que las relaciones estén correctamente establecidas

2. **Probar creación de pacientes:**
   ```bash
   npm run test:patient
   ```

3. **Verificar datos de seed:**
   - Asegurarse de que todos los pacientes en `PatientSeeds.js` tengan `userId` (no `userid`)
   - Verificar que el `userId` corresponda a un usuario existente

4. **Verificar relaciones en el código:**
   ```javascript
   // En el controlador, asegurarse de incluir userId
   const newPatient = {
     ...req.body,
     userId: req.body.userId || req.user.id // o el ID del usuario actual
   };
   ```

### Problemas de relaciones entre modelos

Si hay problemas con las relaciones entre modelos:

1. Verifica que todos los modelos estén importados en `src/database/models.js`
2. Asegúrate de que las claves foráneas estén correctamente definidas
3. Ejecuta `npm run test:db` para verificar que los modelos se cargan correctamente
4. Ejecuta `npm run test:relationships` para verificar que todas las relaciones funcionan

### Logs de depuración

Para obtener más información sobre errores:

```bash
# Ver logs detallados
docker-compose logs medic-api

# Seguir logs en tiempo real
docker-compose logs -f medic-api
``` 