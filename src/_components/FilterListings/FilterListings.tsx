'use client';
import { Input } from '@/_components/FormInput/Input';
import { useForm } from 'react-hook-form';
import { IListing } from '@/_utils/types/types';
import styles from './FilterListings.module.scss';
import { useAppDispatch } from '@/_hooks/reduxHooks';
import { typeOptionsWithAny, levelOptionsWithAny } from '@/_utils/mocks/options';
import { filterListing } from '@/store/preview/previewSlice';
import { useEffect } from 'react';
import { Select } from '@/_components/Select/Select';
import { useClientActions } from '@/_hooks/useClientActions';

export const FilterListings = () => {
  const { resetFilters } = useClientActions();
  const dispatch = useAppDispatch();
  const {
    watch,
    register,
    setValue,
    reset,
  } = useForm<IListing>({
    defaultValues: {
      salary: 0,
    },
  });
  const watchAll = watch();
  
  useEffect(() => {
    dispatch(filterListing(watchAll));
  }, [dispatch, watchAll]);
  
  return (
    <div className={styles.filters}>
      <div className={styles.filters_item}>
        <Input labelText='Title' type='text' name='title' register={register} />
      </div>
      <div className={styles.filters_item}>
        <Input labelText='Location' type='text' name='location' register={register} />
      </div>
      <div className={styles.filters_item}>
        <Input labelText='Minimum Salary' type='number' name='salary' register={register} />
      </div>
      <div className={styles.filters_select}>
        <Select options={typeOptionsWithAny} fieldName='type' register={register} setValue={setValue} />
      </div>
      <div className={styles.filters_select}>
        <Select options={levelOptionsWithAny} fieldName='experienceLevel' register={register} setValue={setValue} />
      </div>
      <div className={styles.filters_group}>
        <div className={styles.filters_checkbox}>
          <div className={styles.filters_checkbox__item}>
            <Input labelText='Show Favorites' type='checkbox' name='favorites' register={register} />
          </div>
          <div className={styles.filters_checkbox__item}>
            <Input labelText='Show Hidden' type='checkbox' name='hidden' register={register} />
          </div>
        </div>
          <button className={styles.filters_reset} onClick={() => resetFilters(reset)}>Reset</button>
      </div>
    </div>
  );
};