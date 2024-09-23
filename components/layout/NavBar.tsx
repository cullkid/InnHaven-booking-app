"use client";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import { Container } from "../Container";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SearchInput } from "../SearchInput";

export const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 border border-primary/10 bg-secondary">
      <Container>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src="/logo.svg" alt="logo" width="35" height="35" />
            <div className="font-bold text-xl">Inn-Haven</div>
          </div>
          <SearchInput />
          <div className="flex gap-10 items-center">
            <div>theme</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!userId && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/sign-in")}
                >
                  Sign-In
                </Button>
                <Button size="sm" onClick={() => router.push("/sign-up")}>
                  Sign-Up
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
