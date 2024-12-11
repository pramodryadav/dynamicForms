export const getToastOptions = (onChangeToast) => {
    return {
        onOpen: props => onChangeToast(true),
        onClose: props => onChangeToast(false),
    };
}