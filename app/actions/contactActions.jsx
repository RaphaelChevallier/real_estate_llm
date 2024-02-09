"use server";
import { revalidatePath } from "next/cache";

export async function sendContactForm(formData) {
  let name = await formData.get("name");
  let email = await formData.get("email");
  let phone = await formData.get("phone");
  let subject = await formData.get("subject");
  let message = await formData.get("message");
  let notify = await formData.get("notify");
  let passwordHoneyPot = await formData.get("a_password");
  let faxHoneyPot = await formData.get("contact_me_by_fax_only");

  try {
    if (faxHoneyPot === "false" && passwordHoneyPot === "") {
      let myHeaders = new Headers();
      myHeaders.append("accept", "application/json");
      myHeaders.append(
        "api-key",
        process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY : ""
      );
      myHeaders.append("content-type", "application/json");

      let raw = JSON.stringify({
        sender: {
          name: "Internal Contact Form - " + name,
          email: "internalcontact@datadivehomes.com",
        },
        to: [
          {
            email: "datadivehomes@gmail.com",
            name: "Data Dive Homes",
          },
        ],
        subject: subject,
        htmlContent: `<p><strong>Name: </strong>${name}</p>
          <p><strong>Phone Number: </strong>${phone}</p>
          <p><strong>Email: </strong>${email}</p>
          <p><strong>Notify: </strong>${notify}</p>
          <p><strong>Message: </strong>${message}</p>`,
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://api.brevo.com/v3/smtp/email", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
    revalidatePath("/");
    return { message: "\u2713 Message Sent!" };
  } catch (e) {
    return { message: "There was an error. Please try again later." };
  }
}
