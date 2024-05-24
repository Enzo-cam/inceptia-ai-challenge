2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por ejemplo autenticación, solicitud de clientes activos para el usuario y solicitud de casos por cliente) 
    Para manejar las acciones de autenticación, como solicitudes de clientes activos y casos por cliente utilizando Redux, se pueden seguir los siguientes pasos:
    -Acciones: Defini los distitnos tipos de acciones para cada solicitud.
    -Reducers: Implemente reducers que responden a estas acciones. Cada reducer actualizará el estado global basado en la acción recibida y los datos proporcionados.
    -Thunk Middleware: Hice uso de Redux Thunk para manejar efectos secundarios, como solicitudes asíncronas a la API. Esto permite despachar acciones que realizan llamadas HTTP y luego despachar acciones adicionales en respuesta a los datos recibidos o errores.
    -Componentes: Cada componente esta conectado con el estado de Redux usando hooks como useSelector() y useDispatch() para acceder y modificar el estado.

2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías el index.js? 
    -index.tsx: Primero debemos asegurarnos de que BrowserRouter está envolviendo a la aplicación.
    -App.tsx: Dentro del componente App, utilizar el componente Routes de React Router para definir las rutas. Agregar un componente Route para la nueva ruta especificando el componente a renderizar y el path.
    -Organización de Componentes: Colocar el nuevo componente o página en la carpeta 'pages', siguiendo la convención de nombrado basada en la ruta que representa.