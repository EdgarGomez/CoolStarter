import Footer from "../components/footer";
import Meta from "../components/meta";
import TopMenu from "../components/topmenu";
import { Box } from "@chakra-ui/core";

export default function Layout({ children, header }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <TopMenu header={header} />

        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
