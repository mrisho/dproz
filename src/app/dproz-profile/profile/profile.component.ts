import { Component, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../../shared/services/state.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PlacesService } from '../../shared/services/places.service';
import * as isEmail from 'isemail';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'dproz-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any;
  editForm = false;
  profileForm: FormGroup;
  selectedState: any;
  cities: any;
  selectedCity: any;
  counties: any;
  selectedCounty: any;
  streets: any;
  states: any;

  constructor(
    private fb: FormBuilder,
    private state: StateService,
    private service: AuthenticationService,
    private placesService: PlacesService,
    private userService: UserService) { }
  @ViewChild('myname') input;

  ngOnInit() {

    this.profileForm = this.fb.group({
      userType: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: '',
      emailAddress: ['', Validators.required],
      phone: this.fb.group({
        phoneNumber: '',
        primary: true,
        contactMethod: 'CALL'
      }),
      address: this.fb.group({
        longitude: [0, [this.requiredValidator.bind(this)]],
        latitude: [0, this.requiredValidator.bind(this)],
        street: ['', this.requiredValidator.bind(this)],
        county: ['', this.requiredValidator.bind(this)],
        region: ['', this.requiredValidator.bind(this)],
        country: ['', this.requiredValidator.bind(this)],
        postcode: ['', this.requiredValidator.bind(this)],
        timezone: ['', this.requiredValidator.bind(this)]
      })
    });

    this.placesService.getRegions().subscribe(regions => {
      this.states = regions;
      // console.log(this.states);

    });

    this.state.user.subscribe(u => {
      this.user = u;
      // console.log(u);
      if (this.user.identity)
        this.profileForm.patchValue(this.user.identity);

      if (this.user.identity && this.user.identity.address) {

      }
      // console.log(this.profileForm.getRawValue());

    });

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.service.postThumbnail(file, this.user.identity.userReferenceId, 'PHOTO_ID', null, 'true');
    }
  }

  focus(e) {
    e.target.parentElement.classList.add('focus-t');
    console.log(e);

  }

  blur(e) {
    e.target.parentElement.classList.remove('focus-t');
    console.log(e);

  }

  toggleEdit() {
    this.editForm = !this.editForm;
    console.log(this.state.getState().identity);

    if (this.editForm) {
      this.profileForm.get('address').patchValue(this.state.getState().identity.address);
      console.log(this.profileForm.getRawValue())
      if (this.profileForm.get('address').value.region) {
        this.placesService.getCities(this.profileForm.get('address').value.region).subscribe(cities => {
          this.cities = cities;          
          console.log(this.state.getState().identity.address.region);
          if (this.state.getState().identity.address.county) {
            this.placesService.getCounties(this.profileForm.get('address').value.region, this.profileForm.get('address').value.city).subscribe(counties => {
              this.counties = counties;
            })
          }
        })
      }
    }
  }

  saveForm() {
    this.onSubmit();
  }

  requiredValidator(c) {
    return (this.user === 'PRO' && !c.value) ? { required: true } : null;
  }


  addressChange(e) {
    if (e.target.id === 'state') {
      this.selectedState = e.target.value;
      this.profileForm.get('address').get('region').setValue(null);
      this.profileForm.get('address').get('county').setValue(null);
      this.profileForm.get('address').get('street').setValue(null);
      this.placesService.getCities(this.selectedState).subscribe(cities => {
        this.cities = cities;
      })
    } else if (e.target.id === 'city') {
      this.profileForm.get('address').get('county').setValue(null);
      this.profileForm.get('address').get('street').setValue(null);
      this.selectedCity = e.target.value
      this.placesService.getCounties(this.selectedState, this.selectedCity).subscribe(counties => {
        this.counties = counties;
      })
    } else if (e.target.id === 'county') {
      this.profileForm.get('address').get('street').setValue(null);
      this.selectedCounty = e.target.value;
      this.placesService.getStreets(this.selectedState, this.selectedCity, this.selectedCounty).subscribe(streets => {
        this.streets = streets;
      })
    } else if (e.target.id === 'street') {
      let addressSelected: any = this.streets.find(el => el._street === e.target.value && el._county === this.selectedCounty);

      this.profileForm.patchValue({
        address: {
          longitude: addressSelected._longitude,
          latitude: addressSelected._latitude,
          street: addressSelected._street,
          city: addressSelected._city,
          county: addressSelected._county,
          postcode: addressSelected._postcode,
          region: addressSelected._region,
          country: addressSelected._country,
          timezone: addressSelected._timezone
        }
      });
      console.log(this.profileForm.get('address'));
    }
  }

  userType(e) {

    this.user = e.target.id;
    let { checked } = e.target;
    if (checked)
      this.profileForm.get('userType').setValue(this.user);
    else
      this.profileForm.get('userType').setValue('');
  }

  onSubmit() {
    // this.profileForm.disable();
    if (!isEmail.validate(this.profileForm.get('emailAddress').value))
      this.profileForm.get('emailAddress').setErrors({ invalidEmail: 'error' });

    if (this.profileForm.valid) {
      let form = this.profileForm.getRawValue();
      // if (form.userType === 'USER') {f
      // }
      this.userService.updateprofile(this.state.getState().userReferenceId, form).subscribe((data) => {
        window.sessionStorage.setItem('encoded', window.btoa(this.profileForm.get('emailAddress').value));
        this.state.setIdentity(form);
        this.toggleEdit();
      }, error => {
        this.toggleEdit();
        console.log(error, `Error!!!!`)
      });

    }

  }

}
