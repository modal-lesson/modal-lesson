export function Modal() {
  return (
    <>
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn">
        Login
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Welcome! Login to get started!</h3>
          <p className="py-4">Placeholder text</p>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
