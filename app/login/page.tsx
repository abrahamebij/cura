"use client"; // Enables client-side rendering in Next.js
import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Router for programmatic navigation
import FormInput from "../components/FormInput"; // Custom input component
import { signIn } from "next-auth/react"; // Authentication function
import { toast } from "sonner"; // Notification library
import Select from "../components/Select"; // Custom select dropdown component
import Link from "next/link"; // Link for navigation

// Define types for form data
interface FormData {
  portal: string;
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter(); // Initialize router
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  ); // Store selected portal value
  const selectRef = useRef<HTMLSelectElement>(null); // Reference to the select dropdown

  // Handle change in select dropdown
  const handleChange = () => {
    if (selectRef.current) {
      setSelectedValue(selectRef.current.value);
    }
  };

  // Set initial select value on component mount
  useEffect(() => {
    if (selectRef.current) {
      setSelectedValue(selectRef.current.value);
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on submit
    setLoading(true);

    // Extract form data
    const form = e.target as HTMLFormElement;
    const formData: FormData = {
      portal: (form.elements.namedItem("portal") as HTMLSelectElement).value,
      email: (
        form.elements.namedItem("email") as HTMLInputElement
      ).value.trim(),
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
    };
    const { portal, email, password } = formData;
    const data = { email, password };

    // Check if portal is not selected
    if (portal === "none") {
      toast.error("Please select the type of portal you want to login to");
      setLoading(false);
      return;
    }

    // Patient portal login logic
    if (portal === "patient") {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          ...data,
        });
        if (result?.error) {
          toast.error(result.error); // Show error toast
        } else {
          toast.success("Logged in successfully");
          router.push("/patient"); // Redirect to patient dashboard
        }
      } catch (error) {
        console.log(error); // Log unexpected errors
      } finally {
        setLoading(false); // Reset loading state
      }
    }
    // Staff portal login logic (hardcoded passwords)
    else if (portal === "staff") {
      window.localStorage.clear();
      if (password === "choi102") {
        window.localStorage.setItem("staffId", "staff_001");
        toast.success("Logged in successfully to Dr. Choi's account");
        const a = document.createElement("a");
        a.href = "/staff/dashboard";
        a.click();
        // router.push("/staff/dashboard");
      } else if (password === "sarahSmith2") {
        window.localStorage.setItem("staffId", "staff_002");
        toast.success("Logged in successfully to Dr. Sarah's account");
        const a = document.createElement("a");
        a.href = "/staff/dashboard";
        a.click();
        // router.push("/staff/dashboard");
      } else {
        toast.error("Wrong password!!! Enter the password specified");
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center flex-1 my-20">
      <div className="w-10/12 md:w-3/5 lg:w-2/5">
        {/* Login Form */}
        <form
          className="flex flex-col bg-white px-3 py-2 rounded shadow-xl border border-writing/10"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-primary text-center my-5 text-lg md:text-xl lg:text-2xl">
            Login to your Account
          </h2>

          <div className="flex flex-col gap-y-2">
            {/* Select Portal */}
            <Select
              id={"portal"}
              title="Select Portal to log in to:"
              options={["Patient Portal", "Staff Portal"]}
              selectRef={selectRef}
              onChange={handleChange}
            />

            {/* Email Input */}
            <FormInput
              title={"Email Address"}
              id={"email"}
              type={"email"}
              required={true}
              texts={
                selectedValue === "staff"
                  ? ["Enter in a random email....doesn't matter"]
                  : ["Enter the email you used to register"]
              }
            />

            {/* Password Input */}
            <FormInput
              title={"Password"}
              id={"password"}
              type={"password"}
              texts={
                selectedValue === "staff"
                  ? [
                      "Type 'choi102' to log in to Dr.Choi's account",
                      "Type 'sarahSmith2' to log in to Dr.Sarah's account",
                    ]
                  : [
                      "If you don't remember your password, just register again because there is no option for 'forgot password'",
                    ]
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn-primary text-white ${
              loading && "!bg-gray-300 border-0 text-black"
            } mb-5 mt-8`}
            disabled={loading}
          >
            {loading ? "Hold On" : "Login"}
          </button>

          {/* Link to registration */}
          <p className="text-sm text-center py-3">
            New patients can register{" "}
            <Link href={"/register"} className="link link-primary">
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
