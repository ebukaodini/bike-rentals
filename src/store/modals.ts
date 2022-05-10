
import create, { State } from 'zustand'

interface Toast {
  id: string
  message: JSX.Element | string
  color?: 'success' | 'danger' | 'warning'
  autohide?: number | boolean
}

interface ToastState extends State {
  toastList: Toast[]
}

interface ToastMethodsState extends State {
  toast: (
    message: Toast['message'],
    color?: Toast['color'],
    autohide?: Toast['autohide']
  ) => void
  removeToast: (toast: Toast) => void
  toastId: () => string
}

// ---------------


type LoadingProps = {
  message: string
  isLoading: boolean
}

interface LoadingModalState extends State {
  loadingProps?: LoadingProps
}

interface LoadingModalMethods extends State {
  loading: (
    isLoading: LoadingProps['isLoading'],
    message?: LoadingProps['message']
  ) => void
}

// ---------------

type ConfirmProps = {
  message: string
  context: 'alt-light' | 'danger' | 'success'
  onConfirm?: () => Promise<any>
  onCancel?: () => Promise<any>
  confirmText?: string
  cancelText?: string
}

interface ConfirmModalState extends State {
  confirmProps?: ConfirmProps
}

interface ConfirmModalMethods extends State {
  confirm: (
    message: ConfirmProps['message'],
    context: ConfirmProps['context'],
    onConfirm?: ConfirmProps['onConfirm'],
    onCancel?: ConfirmProps['onCancel'],
    confirmText?: ConfirmProps['confirmText'],
    cancelText?: ConfirmProps['cancelText']
  ) => void
}

// ---------------

type ModalProps = {
  component: JSX.Element
  size: 'sm' | 'lg' | 'xl'
  centered: boolean
  state: any
}

interface DynamicModalState extends State {
  modalProps?: ModalProps
}

interface DynamicModalMethods extends State {
  modal: (
    component: ModalProps['component'],
    size?: ModalProps['size'],
    centered?: ModalProps['centered'],
    state?: ModalProps['state']
  ) => void
  setModalState: (state: any) => void,
  closeModal: () => void
}

export const useModalStore = create
  <
    ToastState & ToastMethodsState &
    LoadingModalState & LoadingModalMethods &
    ConfirmModalState & ConfirmModalMethods &
    DynamicModalState & DynamicModalMethods
  >(
    (set, get) => ({
      toastList: [],
      toastId: () => {
        return `toast_${Math.floor(Math.random() * 99999)}`;
      },
      toast(message, color, autohide = true) {
        const toastId = get().toastId()
        const toast = {
          id: toastId,
          message,
          color: color ?? 'success'
        }

        set({
          toastList: [
            ...get().toastList,
            toast
          ]
        })

        if (typeof autohide == 'boolean' && autohide === true) {
          const lifeTime = 10000;
          setTimeout(() => {
            get().removeToast(toast)
          }, lifeTime);
        } else if (typeof autohide == 'number') {
          setTimeout(() => {
            get().removeToast(toast)
          }, autohide * 1000);
        }

      },
      removeToast(removedToast) {
        set({
          toastList: get().toastList.filter(toast => removedToast.id !== toast.id)
        })
      },

      loadingProps: undefined,
      loading: (loading, message) => {
        set({
          loadingProps: {
            isLoading: loading,
            message: message ?? 'Loading...'
          }
        })
      },

      confirmProps: undefined,
      confirm: (message, context, onConfirm, onCancel?, confirmText?, cancelText?) => {

        set({
          confirmProps: {
            message,
            context,
            onConfirm: onConfirm === undefined ? async () => {} : onConfirm,
            onCancel: onCancel === undefined ? async () => {} : onCancel,
            confirmText: confirmText!,
            cancelText: cancelText!
          }
        })

        document.getElementById('app-confirm-modal-toggle-btn')?.click()
      },

      modalProps: undefined,
      modal: (component, size, centered, state) => {

        set({
          modalProps: {
            component,
            size: size!,
            centered: centered!,
            state: state!
          }
        })

        document.getElementById('app-modal-toggle-btn')?.click()
      },

      setModalState: (state) => {
        const props = get()?.modalProps!
        props.state = state

        set({
          modalProps: { ...props }
        })
      },

      closeModal: () => {
        document.getElementById('app-modal-toggle-btn')?.click()
        set({
          modalProps: undefined
        })
      }

    })
  )
