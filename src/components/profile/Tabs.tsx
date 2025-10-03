import { ROUTE_PATHS } from '@/constants/routes'
import { FingerPrintIcon, UserIcon } from '@heroicons/react/20/solid'
import { ArrowLeft } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const tabs = [
    { name: 'Mi Cuenta', href: ROUTE_PATHS.PROFILE.VIEW, icon: UserIcon },
    { name: 'Cambiar contraseña', href: ROUTE_PATHS.PROFILE.PASSWORD, icon: FingerPrintIcon },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Tabs = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const currentTab = tabs.filter(tab => tab.href === location.pathname)[0].href

    return (
        <div className='mb-10'>

            <div className="mb-8 flex items-start">
                <Link to={ROUTE_PATHS.HOME} className="group inline-flex cursor-pointer items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 cursor-pointer" />
                    Volver a proyectos
                </Link>
            </div>

            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="
                        block w-full rounded-xl 
                        border-2 border-gray-200 
                        bg-white px-4 py-3
                        text-gray-900 font-medium
                        focus:border-purple-600 focus:ring-4 focus:ring-purple-100
                        focus:outline-none
                        shadow-sm
                        transition-colors"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => navigate(e.target.value)}
                    value={currentTab}
                >
                    {tabs.map((tab) => {
                        return (
                            <option
                                value={tab.href}
                                key={tab.name}>{tab.name}</option>
                        )
                    })}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'border-purple-800 text-white'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Tabs