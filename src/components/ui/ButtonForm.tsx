type LoadingButtonProps = {
  isPending: boolean;
  loadingText?: string;
  children: React.ReactNode;
};

const ButtonForm = ({ isPending, loadingText, children }: LoadingButtonProps) => {
    return (
        <button
            type="submit"
            disabled={isPending}
            className={`cursor-pointer w-full text-white font-medium py-3 px-6 rounded-lg 
                transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25
                ${isPending
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
        >
            {isPending ? (
                <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {loadingText || "Cargando..."}
                </div>
            ) : (
                <>{children}</>
            )}
        </button>
    )
}

export default ButtonForm