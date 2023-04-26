"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useCarModal";

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Select from "react-select";

const fuelOptions = [
  {
    label: "Petrol",
    value: "petrol",
  },
  {
    label: "Diesel",
    value: "diesel",
  },
];

const transmissionOptions = [
  {
    label: "Automatic",
    value: "automatic",
  },
  {
    label: "Manual",
    value: "manual",
  },
];

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      make: "",
      location: null,
      region: "",
      imageSrc: "",
      price: 1000000,
      description: "",
      model: "",
      mileage: "",
      color: "",
      fuel: "",
      allowContact: true,
      allowWhatsapp: true,
      contact: "",
      whatsapp: "",
      engine: "",
      transmission: "",
      year: 2000,
    },
  });

  const location = watch("location");
  const fuel = watch("fuel");
  const transmission = watch("transmission");
  const make = watch("make");
  const imageSrc = watch("imageSrc");
  const allowWhatsapp = watch("allowWhatsapp");
  const allowContact = watch("allowContact");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(make) => setCustomValue("make", make)}
              selected={make === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your car located?"
          subtitle="Help people find you!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <hr />
        <Input
          id="region"
          label="Region"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        {/* <Map center={location?.latlng} /> */}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your car"
          subtitle="What are the features of the car?"
        />
        <Input
          id="model"
          label="Model"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="year"
          label="Year"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="mileage"
          label="Mileage"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="color"
          label="Color"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="engine"
          label="Engine"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <div>
          <Select
            placeholder="Fuel"
            isClearable
            options={fuelOptions}
            value={fuel}
            onChange={(value) => setCustomValue("fuel", value.value)}
            formatOptionLabel={(option: any) => (
              <div className="flex flex-row items-center gap-3">
                <div>{option.label}</div>
              </div>
            )}
            classNames={{
              control: () => "p-3 border-2",
              input: () => "text-lg",
              option: () => "text-lg",
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: "black",
                primary25: "#ffe4e6",
              },
            })}
          />
        </div>
        <hr />
        <div>
          <Select
            placeholder="Transmission"
            isClearable
            options={transmissionOptions}
            value={transmission}
            onChange={(value) => setCustomValue("transmission", value.value)}
            formatOptionLabel={(option: any) => (
              <div className="flex flex-row items-center gap-3">
                <div>{option.label}</div>
              </div>
            )}
            classNames={{
              control: () => "p-3 border-2",
              input: () => "text-lg",
              option: () => "text-lg",
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 6,
              colors: {
                ...theme.colors,
                primary: "black",
                primary25: "#ffe4e6",
              },
            })}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your car"
          subtitle="Show people what your car looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your car?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="contact"
          label="Contact"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="whatsapp"
          label="WhatsApp Contact"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={allowWhatsapp}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Allow WhatsApp
            </span>
          </label>
        </div>
        <hr />
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={allowContact}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Show Contact
            </span>
          </label>
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formalPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Sell your car!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
