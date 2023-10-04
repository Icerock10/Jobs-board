'use client';
import styles from './TaskForm.module.scss';
import { FieldValues, useForm } from 'react-hook-form';
import { IListing, Task } from '@/_utils/types/types';
import { taskFields } from '@/_utils/mocks/taskMenus';
import { Select } from '@/_components/Select/Select';
import { Input } from '@/_components/FormInput/Input';
import { useAppDispatch } from '@/_hooks/reduxHooks';
import { createTask, editTask } from '@/store/tasks/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { FormButton } from '@/_components/Button/FormButton/FormButton';

export const TaskForm = ({ foundTask }: { foundTask?: Task }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isEdit = foundTask ? 'Edit' : 'Create';
  
  const [
    { field: status, dropDownMenus: statusMenus },
    { field: priority, dropDownMenus: priorityMenus },
    {
      field: categoryField, dropDownMenus: categoryMenus,
    }] = taskFields;
  
  const {
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    register,
    setValue,
  } = useForm<IListing>({
    defaultValues: {
      title: foundTask?.title || '',
      status: statusMenus[0],
      priority: priorityMenus[0],
      category: categoryMenus[0],
    },
    mode: 'all',
  });
  const createOrEditTask = (data: FieldValues) => {
    const newTask = {
      ...data,
      _id: uuidv4(),
    };
    foundTask ? dispatch(editTask({ ...foundTask, ...data })) : dispatch(createTask(newTask));
  };
  
  return (
    <form onSubmit={handleSubmit(createOrEditTask)}>
      <div className={styles.form}>
        <div>
          <Input hasError={Boolean(errors.title)} labelText={'Title'} type='text' name='title' register={register} />
          {errors.title && <p className={styles.error}>{errors.title.message}</p>}
        </div>
        <div>
          <Select options={statusMenus} isDbField={foundTask?.status} fieldName={status.toLowerCase()}
                  register={register}
                  setValue={setValue} />
        </div>
        <div>
          <Select options={priorityMenus} isDbField={foundTask?.priority} fieldName={priority.toLowerCase()}
                  register={register}
                  setValue={setValue} />
        </div>
        <div>
          <Select options={categoryMenus} isDbField={foundTask?.category} fieldName={categoryField.toLowerCase()}
                  register={register}
                  setValue={setValue} />
        </div>
      </div>
      <div className={styles.button}>
        <FormButton handleClick={router.back} isValid={isValid} isSubmitting={isSubmitting}>{isEdit}</FormButton>
      </div>
    </form>
  );
};