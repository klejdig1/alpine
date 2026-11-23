import { useState } from "react";
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import { useCreateCabin } from "./useCreateCabin.js";
import { useEditCabin } from "./useEditCabin.js";
import { HiOutlineShieldCheck, HiOutlinePhoto } from "react-icons/hi2";

const PRESET_IMAGES = [
  { id: "001", label: "Forest Retreat", url: "/cabins/cabin-001.jpg" },
  { id: "002", label: "Spa Chalet", url: "/cabins/cabin-002.jpg" },
  { id: "003", label: "Pine Lodge", url: "/cabins/cabin-003.jpg" },
  { id: "004", label: "Lakeside Villa", url: "/cabins/cabin-004.jpg" },
  { id: "005", label: "Timber Suite", url: "/cabins/cabin-005.jpg" },
  { id: "006", label: "Alpine Grand", url: "/cabins/cabin-006.jpg" },
  { id: "007", label: "Panoramic Sauna", url: "/cabins/cabin-007.jpg" },
  { id: "008", label: "Presidential Chalet", url: "/cabins/cabin-008.jpg" },
];

const SafeguardNotice = styled.div`
  background-color: var(--color-brand-50);
  border: 1px dashed var(--color-brand-500);
  border-radius: var(--border-radius-md);
  padding: 1.2rem 1.6rem;
  font-size: 1.2rem;
  color: var(--color-brand-800);
  display: flex;
  align-items: center;
  gap: 1rem;
  line-height: 1.4;

  & svg {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    color: var(--color-brand-600);
  }
`;

const PresetGalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
`;

const PresetGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PresetCard = styled.div`
  border: 2px solid ${(props) => (props.$selected ? "var(--color-brand-600)" : "var(--color-grey-200)")};
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  cursor: pointer;
  background: var(--color-grey-0);
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: var(--color-brand-500);
    transform: translateY(-2px);
  }
`;

const PresetImg = styled.img`
  width: 100%;
  height: 6rem;
  object-fit: cover;
  display: block;
`;

const PresetLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  padding: 0.2rem 0.4rem;
  color: var(--color-grey-600);
  background: var(--color-grey-50);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BLOCKED_TERMS = ["stupid", "dumb", "ugly", "fake", "troll", "trash", "hate", "test123", "asdf"];

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isLoading, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isLoading || isEditing;

  const { id: editId, ...editValue } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const [selectedPreset, setSelectedPreset] = useState(
    isEditSession && typeof editValue.image === "string" ? editValue.image : "/cabins/cabin-001.jpg"
  );

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValue : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    // Determine image: if a file was uploaded use it, otherwise use selected curated preset
    let finalImage = selectedPreset || "/cabins/cabin-001.jpg";
    if (data.image && data.image.length > 0 && typeof data.image !== "string") {
      finalImage = data.image[0];
    } else if (typeof data.image === "string" && data.image) {
      finalImage = data.image;
    }

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image: finalImage }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: finalImage },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? "modal" : "regular"}>
      <SafeguardNotice>
        <HiOutlineShieldCheck />
        <span>
          <strong>Live Session Sandbox:</strong> You can create, edit, or delete anything. All changes update live in your session and will automatically reset to normal when you refresh the page.
        </span>
      </SafeguardNotice>

      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          placeholder="e.g. Alpine Pine Suite"
          {...register("name", {
            required: "This field is required",
            minLength: {
              value: 2,
              message: "Cabin name must be at least 2 characters",
            },
            maxLength: {
              value: 30,
              message: "Cabin name cannot exceed 30 characters",
            },
            validate: (value) => {
              const lower = value.trim().toLowerCase();
              if (BLOCKED_TERMS.some((b) => lower.includes(b))) {
                return "Please enter an authentic hotel cabin name (e.g. Mountain Chalet, Suite 009)";
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1 guest",
            },
            max: {
              value: 20,
              message: "Capacity cannot exceed 20 guests",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price ($)" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 50,
              message: "Price should be at least $50",
            },
            max: {
              value: 10000,
              message: "Price cannot exceed $10,000",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount ($)" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          placeholder="Luxury cabin featuring heated deck, panoramic nature views, and modern comforts..."
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Choose Curated Photo" error={errors?.image?.message}>
        <PresetGalleryContainer>
          <div style={{ fontSize: "1.2rem", color: "var(--color-grey-500)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <HiOutlinePhoto /> Select from pre-approved luxury gallery:
          </div>
          <PresetGalleryGrid>
            {PRESET_IMAGES.map((preset) => (
              <PresetCard
                key={preset.id}
                $selected={selectedPreset === preset.url}
                onClick={() => setSelectedPreset(preset.url)}
                title={preset.label}
              >
                <PresetImg src={preset.url} alt={preset.label} />
                <PresetLabel>{preset.label}</PresetLabel>
              </PresetCard>
            ))}
          </PresetGalleryGrid>

          <div style={{ marginTop: "0.8rem", fontSize: "1.2rem", color: "var(--color-grey-500)" }}>
            Or upload your own custom photo:
          </div>
          <FileInput
            id="image"
            disabled={isWorking}
            accept="image/*"
            {...register("image")}
          />
        </PresetGalleryContainer>
      </FormRow>

      <FormRow>
        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
