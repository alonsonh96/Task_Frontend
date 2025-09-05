type LoadingButtonProps = {
  isPending: boolean;
  loadingText?: string;
  children: React.ReactNode;
};

const ButtonForm = ({ isPending, loadingText, children } : LoadingButtonProps) => {
    return (
        <button
            type="submit"
            className={`w-full cursor-pointer mt-5 py-5 px-8 rounded-xl text-xl font-bold text-white transition-all duration-300 transform hover:scale-102 shadow-lg 
                ${isPending ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-white/95 bg-gradient-to-r from-slate-800 via-slate-800 to-slate-800 hover:shadow-xl'
                }`}
        >
            {isPending ? (
                <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {loadingText || 'Cargando...'}
                </div>
            ) : (
                <div className="flex items-center justify-center gap-3">
                    {children}
                </div>
            )}
        </button>
    )
}

export default ButtonForm