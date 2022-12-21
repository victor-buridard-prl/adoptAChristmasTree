import LoginPage from "../components/LoginPage";
import UserMenu from "../components/UserMenu";

// The Home component is not exported but it can be used to test your component in isolation
// Having a proper development environment to test the components separately
// is a critical element of micro-frontend architecture
export default function Home() {
  return (
    <div>
      <LoginPage />
      <UserMenu />
    </div>
  );
}
