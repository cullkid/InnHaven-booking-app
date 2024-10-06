"use client";

import { SignedIn, useAuth, UserButton } from "@clerk/nextjs";
import { Container } from "../Container";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SearchInput } from "../SearchInput";
import { ModeToggle } from "../theme-toggle";
import { NavMenu } from "./NavMenu";

export const NavBar = () => {
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="relative">
      <div className="fixed z-10 left-0 right-0 top-0 border border-primary/10 bg-secondary">
        <Container>
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="font-bold text-xl">Inn</div>
              <Image src="/logo.svg" alt="logo" width="35" height="35" />
              <div className="font-bold text-xl">Haven</div>
            </div>
            <SearchInput />
            <div className="flex gap-10 items-center">
              <div>
                <ModeToggle />
                <NavMenu />
              </div>
              <SignedIn>
                <UserButton />
              </SignedIn>
              {!userId && (
                <>
                  <Button size="sm" onClick={() => router.push("/sign-in")}>
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
    </div>
  );
};
