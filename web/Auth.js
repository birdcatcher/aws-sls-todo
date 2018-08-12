// component js code
Vue.component(
  // component tag name
  'Auth', 

  // component object code start
  // component can be register under different tag name
  {
    // component data MUST be function
    props: ["cognito", "value"],
    data() {
      return {
        dialog: this.value,
        email: "demo@demo.com",
        password: "demo1234",
        idToken: null
      }
    },
    methods: {  
      logout: function() {
        this.idToken = null;    
        this.$emit('loggedout', null);
      },
      login: function() {
        var userPool = new AWSCognito
          .CognitoIdentityServiceProvider
          .CognitoUserPool({
            UserPoolId : this.cognito.poolId,
            ClientId : this.cognito.appClientId    
        });
        
        var cognitoUser = new AWSCognito
        .CognitoIdentityServiceProvider
        .CognitoUser({
          Username : this.email,
          Pool : userPool
        });

        var authenticationDetails = new AWSCognito
        .CognitoIdentityServiceProvider
        .AuthenticationDetails({
          Username : this.email,
          Password : this.password,     
        });
        cognitoUser.authenticateUser(
          authenticationDetails, 
          {
            onSuccess: result => {
              this.idToken =                
                result.getIdToken().getJwtToken();
              this.$emit('loggedin', this.idToken);
            },
            onFailure: function(err) {
              alert(err);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
              var newPassword = prompt('New paswword', '');
              cognitoUser.completeNewPasswordChallenge(
                newPassword, {}, this);
              }    
        });
        
        this.dialog = false;
      }
    },

    // debug template
    // template: document.getElementById('component').innerHTML
    // TODO: copy template into string for self contained component
    template: `
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field  v-model="email" label="Email"required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field  v-model="password" label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog=false">Cancel</v-btn>
          <v-btn flat @click="login()">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    `
  }
  // component object code end
)