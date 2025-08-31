import { ROUTE_PATHS } from '@/constants/routes'

const NotFoundView = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
            <p className="text-gray-600 mb-8">La página que buscas no existe o ha sido movida.</p>
            <button 
                onClick={() => window.history.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 cursor-pointer"
            >
                Volver
            </button>
            <a 
                href={ROUTE_PATHS.HOME}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
                Ir al inicio
            </a>
        </div>
    </div>
  )
}

export default NotFoundView