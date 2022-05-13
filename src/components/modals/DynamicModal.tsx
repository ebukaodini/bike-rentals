import { useModalStore } from "../../store"

export const DynamicModal: React.FC = () => {

  const { modalProps } = useModalStore()

  return (
    <>
      <button aria-label='toggle dynamic modal' id="app-modal-toggle-btn" type="button" className="btn d-none" data-bs-toggle="modal" data-bs-target="#app-modal" />

      <div id="app-modal" style={{ zIndex: '1051' }} className="modal fade" data-bs-keyboard="false" tabIndex={-1} data-bs-backdrop="static" aria-hidden={true}>

        <div className={`modal-dialog ${modalProps?.size !== undefined && 'modal-' + modalProps?.size} modal-dialog-scrollable ${modalProps?.centered === true && 'modal-dialog-centered'}`}>
          <div className="modal-content bg-light">

            <div className="modal-body">
              {
                modalProps?.component
              }
            </div>

          </div>
        </div>

      </div>

    </>
  )



}
