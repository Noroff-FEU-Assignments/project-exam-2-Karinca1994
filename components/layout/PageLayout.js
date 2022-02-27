const PageLayout = ({ children, page }) => (
  <section className={`main ${page}`} id="main">
    {children}
  </section>
);

export default PageLayout;
