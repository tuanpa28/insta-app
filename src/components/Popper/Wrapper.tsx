interface IWrapper {
  children: React.ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: IWrapper) => {
  return (
    <div
      className={`flex flex-col w-fit min-h-28 max-h-[min((100vh-96px)-60px,734px)] bg-[rgb(255,255,255)] rounded-lg shadow-[0_0_23px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
