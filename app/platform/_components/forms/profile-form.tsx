"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Camera,
  Save,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import { User } from "next-auth";
import { useState } from "react";

interface ProfileFormProps {
  user: User;
}

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: "",
    location: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement profile update logic
    // This would typically call your API to update the user profile

    setTimeout(() => {
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== user.email) {
      return;
    }

    setIsDeleting(true);

    // TODO: Implement account deletion logic
    // This would typically call your API to delete the user account

    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setDeleteConfirmation("");
      // Redirect to home page or show success message
    }, 2000);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
    setDeleteConfirmation("");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Picture Section */}
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Profile Picture</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Update your profile picture to personalize your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
              <AvatarImage src={user.image || ""} alt={user.name || "User"} />
              <AvatarFallback>
                <UserIcon className="h-6 w-6 sm:h-8 sm:w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
              <p className="text-xs sm:text-sm text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Section */}
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">
            Personal Information
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Update your personal details and contact information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  disabled
                  className="h-10 sm:h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm sm:text-base">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Tell us a bit about yourself..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm sm:text-base">
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="City, Country"
                  className="h-10 sm:h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm sm:text-base">
                  Website
                </Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="h-10 sm:h-11"
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                size="sm"
                className="sm:size-default"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Information Section */}
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">
            Account Information
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            View your account details and membership information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-sm font-medium sm:text-base">
                Account ID
              </span>
              <span className="text-sm text-muted-foreground break-all sm:text-base">
                {user.id || "N/A"}
              </span>
            </div>

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-sm font-medium sm:text-base">
                Member Since
              </span>
              <span className="text-sm text-muted-foreground sm:text-base">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <span className="text-sm font-medium sm:text-base">
                Last Login
              </span>
              <span className="text-sm text-muted-foreground sm:text-base">
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center sm:gap-8 sm:pb-6">
          <div className="space-y-2 w-full sm:w-auto">
            <CardTitle className="text-lg sm:text-xl">Delete Account</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </CardDescription>
          </div>
          <Button
            variant="destructive"
            onClick={handleDeleteClick}
            size="sm"
            className="w-full sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </Button>
        </CardHeader>
      </Card>

      {/* Delete Account Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive text-lg sm:text-xl">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription className="text-destructive/80 text-sm sm:text-base">
              This action cannot be undone. This will permanently delete your
              account and remove all your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 sm:p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-destructive">
                    Warning: This action is irreversible
                  </p>
                  <ul className="text-xs sm:text-sm text-destructive/80 space-y-1">
                    <li>
                      • All your snippets and collections will be permanently
                      deleted
                    </li>
                    <li>• Your account data will be completely removed</li>
                    <li>• You will lose access to all premium features</li>
                    <li>• This action cannot be undone or recovered</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="delete-confirmation"
                className="text-sm font-medium"
              >
                Type your email address to confirm deletion
              </Label>
              <Input
                id="delete-confirmation"
                type="email"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder={user.email || "Enter your email address"}
                className="border-destructive/50 focus:border-destructive focus:ring-destructive h-10 sm:h-11"
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="w-full sm:w-auto"
              size="sm"
            >
              Cancel
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  disabled={deleteConfirmation !== user.email}
                  className="w-full sm:w-auto"
                  size="sm"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-sm sm:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-destructive text-lg sm:text-xl">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-destructive/80 text-sm sm:text-base">
                    This action cannot be undone. This will permanently delete
                    your account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
                  <AlertDialogCancel className="w-full sm:w-auto">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
                  >
                    {isDeleting ? (
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      "Yes, delete my account"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
