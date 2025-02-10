import { Button } from "react-bootstrap";


const RegisterUser = () => {
    return (
        <div className="register-container">
            <div className="d-flex ">
                <div className="profile-card">
                    <img src="https://placehold.co/100x100" alt="Profile icon" />
                    <div className="text-center">
                        <p></p>
                        <p></p>
                    </div>
                    <button className="btn btn-primary">+ Add User</button>
                </div>
                <div className="card p-4">
                    <h3 className="mb-4">User Registration</h3>
                    <form>
                        <div className="mb-3">
                            <label for="firstName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="firstName" placeholder="User Name" />
                        </div>

                        <div className="mb-3">
                            <label for="email" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="email" placeholder="Email address" />
                        </div>

                        <div className="mb-3">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label">Password Again</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>
                    </form>
                </div>


            </div>
            <Button className="mx-3 px-3">Register</Button>
        </div>
    )
}

export default RegisterUser;