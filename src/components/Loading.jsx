function Loading({ className = "loading", children }) {
  return (
    <div className={className}>
      <div className="gg-spinner loader-img"></div>
      {children}
    </div>
  );
}

export default Loading;
