import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
          <p className="text-sm text-muted-foreground">
            Page not found
          </p>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link to="/">Go to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotFoundPage;
