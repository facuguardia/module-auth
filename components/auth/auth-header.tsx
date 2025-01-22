interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="space-y-2 text-center mb-6">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
