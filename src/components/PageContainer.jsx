import Footer from "./Footer";
import Header from "./Header";
import CartRightBar from "./Header/CartRightBar";
function PageContainer({ children }) {
  return (
    <div className="relative">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default PageContainer;
