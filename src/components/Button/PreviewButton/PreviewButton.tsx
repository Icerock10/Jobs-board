import styles from './PreviewButton.module.scss';
import {ReactNode, useState} from "react";
import { useVisibility } from '@/hooks/useVisibility';

export const PreviewButton = ({children}: {children: ReactNode}) => {
		const { toggleModalAction } = useVisibility()
	return (
		<button onClick={toggleModalAction} className={styles.preview}>
			{children}
		</button>
	);
};