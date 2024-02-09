"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactForm } from "../app/actions/contactActions";

const Contact = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [faxHoneyPot, setFaxHoneyPot] = useState(false);
  const [passwordHoneyPot, setPasswordHoneyPot] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState(false);
  const { pending } = useFormStatus();
  const router = useRouter();

  async function onSendContactForm(formData) {
    const res = await sendContactForm(formData);
    setNotify(false);
    setPhone("");
    setSubject("");
    setMessage("");
    if (res.message == "\u2713 Message Sent!") {
      onOpen();
    }
  }

  return (
    <div id="/contact">
      <form className="" action={onSendContactForm}>
          
          <div className="grid grid-cols-5 gap-8 text-black">
            {/* left */}
            <div className="col-span-3 lg:col-span-2 w-full h-full bg-gray-200 rounded-xl p-4">
            <p className="text-xl tracking-widest uppercase text-[#00a8ff] mb-2">
            Get In Touch
          </p>
              <div className="lg:p-4 h-full ">
                <div>
                  <Image
                    src={"/contact.jpg"}
                    height={427}
                    width={640}
                    alt="/"
                    className="rounded-xl hover:scale-105 ease-in duration-300 duration-700 ease-in-out group-hover:opacity-70"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="py-2 text-lg font-bold">Connect With Us!</h2>
                  <p className="text-lg">We Would Love to Hear From You.</p>
                  <p className="py-4">
                    Please let us know of any concerns, recommendations, ideas,
                    and what we&apos;re doing well on. We are still growing all
                    the time and we welcome any way we can make your experience
                    better on our platform for your investment strategies!
                  </p>
                  <p className="py-4 text-lg">
                    Email:{" "}
                    <span className="font-bold">support@datadivehomes.com</span>{" "}
                  </p>
                  {/* <p className="py-4 text-lg">
                    Phone Number:{" "}
                    <span className="font-bold">(000)-000-0000</span>{" "}
                  </p> */}
                </div>
              </div>
            </div>

            {/* right */}
            <div className="col-span-3 w-full h-auto bg-gray-200 rounded-xl lg:p-4">
              <div className="p-4">
                <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">Name</label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="uppercase text-sm py-2">
                      Phone Number
                    </label>
                    <input
                      className="border-2 rounded-lg p-3 flex border-gray-300"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Email</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <input
                    type="hidden"
                    onChange={(e) => {
                      setFaxHoneyPot(e.target.value);
                    }}
                    name="contact_me_by_fax_only"
                    value={faxHoneyPot}
                    className="display:none !important"
                    autoComplete="off"
                  ></input>
                  <input
                    type="hidden"
                    onChange={(e) => {
                      setPasswordHoneyPot(e.target.value);
                    }}
                    name="a_password"
                    className="display:none !important"
                    value={passwordHoneyPot}
                    autoComplete="off"
                  ></input>
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Subject</label>
                  <input
                    className="border-2 rounded-lg p-3 flex border-gray-300"
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="uppercase text-sm py-2">Message</label>
                  <textarea
                    className="border-2 rounded-lg p-3 border-gray-300"
                    rows={8}
                    name="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    required
                  ></textarea>
                </div>
                <div className="flex py-2">
                  <label className="uppercase text-[13px] py-1 px-2">
                    <input
                      className="border-2 rounded-lg p-3 border-gray-300"
                      type="checkbox"
                      name="notify"
                      checked={notify}
                      onChange={(e) => {
                        setNotify(e.target.checked);
                      }}
                    />{" "}
                    Receive New Content and Discount Info via Email?
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full p-4 text-gray-100 mt-4 shadow-xl shadow-gray-400 rounded-xl uppercase bg-gradient-to-r from-[#5651e5] to-[#00a8ff] text-white"
                  disabled={pending}
                >
                  {pending ? "Submitting..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
      </form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="bg-[#66ff33] bg-opacity-80 flex flex-col gap-1">
                Message Has Been Sent!
              </ModalHeader>
              <ModalBody>
                <p>
                  Thank you for connecting with us! We have successfully
                  received your message and we will reach back to you as soon as
                  we can.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="light" onPress={onClose}>
                  Send Another
                </Button>
                <Button
                  color="secondary"
                  type="submit"
                  onPress={() => {
                    onClose();
                    router.back();
                  }}
                >
                  Exit Contact Page
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Contact;
