import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl md:text-3xl">
            Create Account
          </CardTitle>

          <p className="text-center text-sm text-muted-foreground">
            Join us and start your shopping journey.
          </p>
        </CardHeader>

        <CardContent>
          <form className="space-y-7">
            <Input
              type="text"
              placeholder="Full Name"
            />

            <Input
              type="email"
              placeholder="Email Address"
            />

            <Input
              type="password"
              placeholder="Password"
            />

            <Button className="w-full">
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;    