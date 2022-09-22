import MainLayout from "../components/Layout/MainLayout";
import { SABreadcrumb, SAButton, SACard, SACol, SAForm, SARow } from "../components/UI/Custom";

const Forms = () => {
  return (
    <MainLayout>
      <SABreadcrumb>
        <SABreadcrumb.Item href="#">Forms</SABreadcrumb.Item>
        <SABreadcrumb.Item active>Basic Elements</SABreadcrumb.Item>
      </SABreadcrumb>

      <SARow>
        <SACol md={6} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Basic Form</SACard.Title>
              <SAForm>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Username</SAForm.Label>
                  <SAForm.Control type="text" placeholder="Username" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Email address</SAForm.Label>
                  <SAForm.Control type="email" placeholder="Email" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Password</SAForm.Label>
                  <SAForm.Control type="password" placeholder="Password" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Check type="checkbox" id="exampleCheck1" label="Remember me" />
                </SAForm.Group>
                <SAButton type="submit" className="me-2">
                  Submit
                </SAButton>
                <SAButton variant="secondary">Cancel</SAButton>
              </SAForm>
            </SACard.Body>
          </SACard>
        </SACol>
        <SACol md={6} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Horizontal Form</SACard.Title>

              <SAForm>
                <SAForm.Group as={SARow} className="mb-3">
                  <SAForm.Label column sm={3}>
                    Username
                  </SAForm.Label>
                  <SACol sm={9}>
                    <SAForm.Control type="text" placeholder="Username" />
                  </SACol>
                </SAForm.Group>
                <SAForm.Group as={SARow} className="mb-3">
                  <SAForm.Label column sm={3}>
                    Email
                  </SAForm.Label>
                  <SACol sm={9}>
                    <SAForm.Control type="email" placeholder="Email" />
                  </SACol>
                </SAForm.Group>
                <SAForm.Group as={SARow} className="mb-3">
                  <SAForm.Label column sm={3}>
                    Mobile
                  </SAForm.Label>
                  <SACol sm={9}>
                    <SAForm.Control type="number" placeholder="Mobile number" />
                  </SACol>
                </SAForm.Group>
                <SAForm.Group as={SARow} className="mb-3">
                  <SAForm.Label column sm={3}>
                    Password
                  </SAForm.Label>
                  <SACol sm={9}>
                    <SAForm.Control type="password" placeholder="Password" />
                  </SACol>
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Check type="checkbox" id="exampleCheck2" label="Remember me" />
                </SAForm.Group>
                <SAButton type="submit" className="me-2">
                  Submit
                </SAButton>
                <SAButton variant="secondary">Cancel</SAButton>
              </SAForm>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>

      <SARow>
        <SACol md={12} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Inputs</SACard.Title>
              <SAForm>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Text Input</SAForm.Label>
                  <SAForm.Control type="text" placeholder="Enter Name" value="Amiah Burton" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Email Input</SAForm.Label>
                  <SAForm.Control type="email" placeholder="Enter Email" value="amiahburton@gmail.com" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Number Input</SAForm.Label>
                  <SAForm.Control type="number" value="6473786" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Password Input</SAForm.Label>
                  <SAForm.Control type="password" value="amiahburton" placeholder="Enter Password" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Disabled Input</SAForm.Label>
                  <SAForm.Control type="text" value="Amiah Burton" disabled />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Placeholder</SAForm.Label>
                  <SAForm.Control type="text" placeholder="Enter Your Name" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Readonly</SAForm.Label>
                  <SAForm.Control type="text" placeholder="Enter Your Name" value="Amiah Burton" readOnly />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Select Input</SAForm.Label>
                  <SAForm.Select>
                    <option selected disabled>
                      Select your age
                    </option>
                    <option>12-18</option>
                    <option>18-22</option>
                    <option>22-30</option>
                    <option>30-60</option>
                    <option>Above 60</option>
                  </SAForm.Select>
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Example multiple select</SAForm.Label>
                  <SAForm.Select multiple>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                  </SAForm.Select>
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Example textarea</SAForm.Label>
                  <SAForm.Control as="textarea" rows={5} />
                </SAForm.Group>

                <SAForm.Group className="mb-3">
                  <SAForm.Label>Range Input</SAForm.Label>
                  <SAForm.Range />
                </SAForm.Group>

                <SAForm.Group className="mb-4">
                  <SAForm.Check type="checkbox" id="checkDefault" label="Default checkbox" className="mb-2" />
                  <SAForm.Check type="checkbox" id="checkChecked" checked label="Checked" className="mb-2" />
                  <SAForm.Check
                    type="checkbox"
                    id="checkDisabled"
                    label="Disabled checkbox"
                    disabled
                    className="mb-2"
                  />
                  <SAForm.Check type="checkbox" id="checkCheckedDisabled" label="Disabled checked" disabled checked />
                </SAForm.Group>

                <SAForm.Group className="mb-4">
                  <SAForm.Check inline type="checkbox" id="checkInline" label="Inline checkbox" className="mb-2" />
                  <SAForm.Check
                    inline
                    type="checkbox"
                    id="checkInlineChecked"
                    checked
                    label="Checked"
                    className="mb-2"
                  />
                  <SAForm.Check
                    inline
                    type="checkbox"
                    id="checkInlineDisabled"
                    label="Inline disabled checkbox"
                    disabled
                    className="mb-2"
                  />
                  <SAForm.Check
                    inline
                    type="checkbox"
                    id="checkInlineCheckedDisabled"
                    label="Disabled checked"
                    disabled
                    checked
                  />
                </SAForm.Group>

                <SAForm.Group className="mb-4">
                  <SAForm.Check type="radio" id="radioDefault" name="radioDefault" label="Default" className="mb-2" />
                  <SAForm.Check type="radio" id="radioDefault1" name="radioDefault" label="Default" className="mb-2" />
                  <SAForm.Check
                    type="radio"
                    id="radioSelected"
                    name="radioSelected"
                    label="Selected"
                    checked
                    className="mb-2"
                  />
                  <SAForm.Check
                    type="radio"
                    id="radioDisabled"
                    name="radioDisabled"
                    label="Disabled"
                    disabled
                    className="mb-2"
                  />
                  <SAForm.Check
                    type="radio"
                    id="radioSelectedDisabled"
                    name="radioSelectedDisabled"
                    label="Selected and disabled"
                    disabled
                    checked
                  />
                </SAForm.Group>

                <SAForm.Group className="mb-4">
                  <SAForm.Check
                    inline
                    type="radio"
                    id="radioInline"
                    name="radioInline"
                    label="Default"
                    className="mb-2"
                  />
                  <SAForm.Check
                    inline
                    type="radio"
                    id="radioInline1"
                    name="radioInline"
                    label="Default"
                    className="mb-2"
                  />
                  <SAForm.Check
                    inline
                    type="radio"
                    id="radioInlineSelected"
                    name="radioInlineSelected"
                    label="Selected"
                    checked
                    className="mb-2"
                  />
                  <SAForm.Check
                    inline
                    type="radio"
                    id="radioInlineDisabled"
                    name="radioInlineDisabled"
                    label="Disabled"
                    disabled
                    className="mb-2"
                  />
                  <SAForm.Check
                    inline
                    type="radio"
                    id="radioInlineSelectedDisabled"
                    name="radioInlineSelectedDisabled"
                    label="Selected and disabled"
                    disabled
                    checked
                  />
                </SAForm.Group>

                <SAForm.Group className="mb-3">
                  <SAForm.Check type="switch" id="formSwitch1" label="Toggle this switch element" className="mb-2" />
                  <SAForm.Check type="switch" id="formSwitch2" label="Disabled switch element" disabled />
                </SAForm.Group>

                <SAForm.Group className="mb-3">
                  <SAForm.Label>File upload</SAForm.Label>
                  <SAForm.Control type="file" />
                </SAForm.Group>

                <SAButton type="submit">Submit form</SAButton>
              </SAForm>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>

      <SARow>
        <SACol md={6} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Input Size</SACard.Title>
              <p className="mb-3">
                Use class <code>.form-control-lg</code> or <code>.form-control-sm</code>
              </p>
              <SAForm>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Small</SAForm.Label>
                  <SAForm.Control size="sm" type="email" placeholder="form-control-sm" />
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Default</SAForm.Label>
                  <SAForm.Control type="email" placeholder="form-control" />
                </SAForm.Group>
                <SAForm.Group>
                  <SAForm.Label>Large</SAForm.Label>
                  <SAForm.Control size="lg" type="email" placeholder="form-control-lg" />
                </SAForm.Group>
              </SAForm>
            </SACard.Body>
          </SACard>
        </SACol>
        <SACol md={6} className="grid-margin stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Select Size</SACard.Title>
              <p className="mb-3">
                Use class <code>.form-control-lg</code> or <code>.form-control-sm</code>
              </p>
              <SAForm>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Small</SAForm.Label>
                  <SAForm.Select size="sm">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </SAForm.Select>
                </SAForm.Group>
                <SAForm.Group className="mb-3">
                  <SAForm.Label>Default</SAForm.Label>
                  <SAForm.Select>
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </SAForm.Select>
                </SAForm.Group>
                <SAForm.Group>
                  <SAForm.Label>Large</SAForm.Label>
                  <SAForm.Select size="lg">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </SAForm.Select>
                </SAForm.Group>
              </SAForm>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>

      <SARow>
        <SACol md={12} className="stretch-card">
          <SACard>
            <SACard.Body>
              <SACard.Title>Form Grid</SACard.Title>
              <SAForm>
                <SARow>
                  <SACol sm={6}>
                    <SAForm.Group className="mb-3">
                      <SAForm.Label>First Name</SAForm.Label>
                      <SAForm.Control type="text" placeholder="Enter first name" />
                    </SAForm.Group>
                  </SACol>
                  <SACol sm={6}>
                    <SAForm.Group className="mb-3">
                      <SAForm.Label>Last Name</SAForm.Label>
                      <SAForm.Control type="text" placeholder="Enter last name" />
                    </SAForm.Group>
                  </SACol>
                </SARow>
                <SARow>
                  <SACol sm={4}>
                    <SAForm.Group className="mb-3">
                      <SAForm.Label>City</SAForm.Label>
                      <SAForm.Control type="text" placeholder="Enter city" />
                    </SAForm.Group>
                  </SACol>
                  <SACol sm={4}>
                    <SAForm.Group className="mb-3">
                      <SAForm.Label>State</SAForm.Label>
                      <SAForm.Control type="text" placeholder="Enter state" />
                    </SAForm.Group>
                  </SACol>
                  <SACol sm={4}>
                    <SAForm.Group className="mb-3">
                      <SAForm.Label>Zip</SAForm.Label>
                      <SAForm.Control type="text" placeholder="Enter zip code" />
                    </SAForm.Group>
                  </SACol>
                </SARow>
                <SARow>
                  <SACol sm={6}>
                    <SAForm.Group className="mb-3">
                      <SAForm.Label>Email address</SAForm.Label>
                      <SAForm.Control type="email" placeholder="Enter email" />
                    </SAForm.Group>
                  </SACol>
                  <SACol sm={6}>
                    <SAForm.Group className="mb-3">
                      <SAForm.Label>Password</SAForm.Label>
                      <SAForm.Control type="password" placeholder="Enter password" />
                    </SAForm.Group>
                  </SACol>
                </SARow>
              </SAForm>
              <SAButton type="submit">Submit form</SAButton>
            </SACard.Body>
          </SACard>
        </SACol>
      </SARow>
    </MainLayout>
  );
};

export default Forms;
