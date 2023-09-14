'use client';
import styles from './Listing.module.scss';
import { Input } from '@/components/FormInput/Input';
import { Select } from '@/components/Select/Select';
import { experienceLevelOptions, newListingsInputFields, typeOptions } from '@/utils/mocks/options';
import { TextArea } from '@/components/TextArea/TextArea';
import { createListing } from '@/lib/db/server-actions';
import React, { useCallback, useEffect } from 'react';
import { fillListings, resetListing } from '@/store/preview/previewSlice';
import { FormButton } from '@/components/Button/FormButton/FormButton';
import { Preview } from '@/components/ListingPreview/Preview';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useRouter } from 'next/navigation';
import { DefaultButton } from '@/components/Button/DefaultButton/DefaultButton';
import { Modal } from '@/components/Modal/Modal';
import { useVisibility } from '@/hooks/useVisibility';
import { toastService } from '@/lib/toast/toastr-service';
import { IListing } from '@/utils/types/types';

export const Listing = ({listingFromDb}: {listingFromDb?: IListing}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isStateReset } = useAppSelector(state => state.preview);
  const { isPreviewShown, togglePreview } = useVisibility();

  useEffect(() => {
    dispatch(resetListing());
    return () => {
      dispatch(resetListing()); // reset on unMount
    };
  }, [dispatch]);
  
  const collectListingsData = useCallback(async (field: string, value: string) => {
    if (!isStateReset) return;
    const newFieldValuePair = { field, value };
    dispatch(fillListings(newFieldValuePair));
  }, [dispatch, isStateReset]);
  
  return (
    <React.Fragment>
      <form
        className={styles.form}
        action={async formData => {
          const response = await createListing(formData)
          if(response?.status === 200) {
            toastService.success(response.data.message)
            router.back()
          }
          toastService.error(response?.data)
        }}
      >
        {newListingsInputFields.map(([labelText, fieldName], index: number) => {
          const isSalaryField = fieldName === 'salary';
          return (
            <div key={index}>
              <Input
                handleChange={collectListingsData}
                labelText={labelText}
                type={isSalaryField ? 'number' : 'text'}
                name={fieldName}
                value={listingFromDb && (fieldName in listingFromDb) ? listingFromDb[fieldName as keyof IListing] : null}
              />
              {isSalaryField && <p className={styles.salary}>In USD</p>}
            </div>
          );
        })}
        <div>
          <Select handleChange={collectListingsData} options={typeOptions} name='type' />
        </div>
        <div>
          <Select handleChange={collectListingsData} options={experienceLevelOptions} name='experienceLevel' />
        </div>
        <TextArea handleChange={collectListingsData} fieldName='shortDescription' labelText='Short Description' />
        <TextArea handleChange={collectListingsData} fieldName='fullDescription' labelText='Full Description' />
        <div className={styles.button_group}>
          <DefaultButton handleClick={router.back}>Cancel</DefaultButton>
          <DefaultButton handleClick={togglePreview}>Show Preview</DefaultButton>
          <FormButton isValid={true}>Submit</FormButton>
        </div>
      </form>
      <Modal>
        <Preview isModalPreview={true} />
      </Modal>
      {isPreviewShown && <Preview />}
    </React.Fragment>
  );
};
