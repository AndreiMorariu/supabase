import supabase from "../config/supabase";

export async function getUserApplications() {
  const { data: sessionData } = await supabase.auth.getSession();

  if (sessionData.session === null) {
    throw new Error("No user authenticated");
  }

  const userID = sessionData.session.user.id;

  const { data: applicationsData, error: applicationsError } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userID);

  if (applicationsError) {
    throw new Error("Applications could not be loaded");
  }

  return applicationsData;
}

export async function insertApplication(application) {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userID = sessionData.session.user.id;

    const { data, error } = await supabase
      .from("applications")
      .insert({ ...application, user_id: userID })
      .select();

    console.log(data);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

export async function deleteApplication(id) {
  try {
    const { error } = await supabase.from("applications").delete().eq("id", id);
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

export async function updateApplication(application, id) {
  try {
    const { data, error } = await supabase
      .from("applications")
      .update(application)
      .eq("id", id)
      .select();
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}
