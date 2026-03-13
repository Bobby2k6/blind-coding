// C:\Users\lenovo\OneDrive\Bobby\Projects\blind-code-blitz-main\src\lib\supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cqepblzftnplpzxfmshx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZXBibHpmdG5wbHB6eGZtc2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxOTQwNTUsImV4cCI6MjA4ODc3MDA1NX0.Wsh5khtKj8I0o6YwHniuHavQ3tpbtNrtPkN7i8-YJ9w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
