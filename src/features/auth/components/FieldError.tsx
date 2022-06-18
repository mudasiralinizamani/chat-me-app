import React from "react";
import { HelperText } from "react-native-paper";
import styles from "../../../../assets/styles/features/auth/screens/SigninStyles";

interface Props {
  visible: boolean;
  message: string | undefined;
}

function FieldError({ visible, message }: Props) {
  return (
    <>
      {visible && (
        <HelperText type="error" visible={visible} style={styles.error}>
          {message}
        </HelperText>
      )}
    </>
  );
}

export default FieldError;
