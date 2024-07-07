<div align="center">
  <h1>SaaS</h1>
</div>

### Description

saas in development

### Back-end

#### Authentication

- [ ] It should be able to authenticate using e-mail & password;
- [ ] It should be able to authenticate using Github account;
- [ ] It should be able to recover password using e-mail;
- [x] It should be able to create an account (e-mail, name and password);

#### Organizations

- [ ] It should be able to create a new organization;
- [ ] It should be able to get organizations to which the user belongs;
- [ ] It should be able to update an organization;
- [ ] It should be able to shutdown an organization;
- [ ] It should be able to transfer organization ownership;

#### Invites

- [ ] It should be able to invite a new member (e-mail, role);
- [ ] It should be able to accept an invite;
- [ ] It should be able to revoke a pending invite;

#### Members

- [ ] It should be able to get organization members;
- [ ] It should be able to update a member role;

#### Projects

- [ ] It should be able to get projects within a organization;
- [ ] It should be able to create a new project (name, url, description);
- [ ] It should be able to update a project (name, url, description);
- [ ] It should be able to delete a project;

#### Billing

- [ ] It should be able to get billing details for organization ($20 per project / $10 per member excluding billing role);

#### RBAC

Roles & permissions.

- Roles
- Owner (count as administrator)
- Administrator
- Member
- Billing (one per organization)
- Anonymous
- Permissions table

#### Permissions table

|                        | Administrator | Member | Billing | Anonymous |
| ---------------------- | ------------- | ------ | ------- | --------- |
| Update organization    | ✅            | ❌     | ❌      | ❌        |
| Delete organization    | ✅            | ❌     | ❌      | ❌        |
| Invite a member        | ✅            | ❌     | ❌      | ❌        |
| Revoke an invite       | ✅            | ❌     | ❌      | ❌        |
| List members           | ✅            | ✅     | ✅      | ❌        |
| Transfer ownership     | ⚠️            | ❌     | ❌      | ❌        |
| Update member role     | ✅            | ❌     | ❌      | ❌        |
| Delete member          | ✅            | ⚠️     | ❌      | ❌        |
| List projects          | ✅            | ✅     | ✅      | ❌        |
| Create a new project   | ✅            | ✅     | ❌      | ❌        |
| Update a project       | ✅            | ⚠️     | ❌      | ❌        |
| Delete a project       | ✅            | ⚠️     | ❌      | ❌        |
| Get billing details    | ✅            | ❌     | ✅      | ❌        |
| Export billing details | ✅            | ❌     | ✅      | ❌        |

✅ = allowed ❌ = not allowed ⚠️ = allowed w/ conditions

Conditions

- Only owners may transfer organization ownership;
- Only administrators and project authors may update/delete the project;
- Members can leave their own organization;

what if I told you that you too could have superpowers to build anything you ever imagined what you're about to witness is far beyond any web application you have ever known this project has been 2 months in the making all just to bring it right into your hands.

Plura is a Wh labeled tenant SAS application that empowers agency owners a market that has not been tapped into yet.

we will build a fully functional landing page where agency owners can sign up with our platform after logging in the agency owner is prompted to create an agency and fill in the all the required information to start on boarding upon submitting the form the user is redirected to the agency dashboard where they can navigate tothe Launchpad start their onboarding, left is dynamically pulled from the database,

means not only can we use stripe to charge month-to-months subscription for our platform but we can also connect the users stripe account into our application we have alse gone above and beyond with stripe and included the ability to charge platform fees from all transactions that happen within all sub accounts even better if the sub account sells a subscription service we get a piace of the cake every single month when the subscription is successful when the agency owner starts their stripe onboaring process they are prompted with two options either to create a stripe account or to connect an existing stripe account into our application once they connect their account they are redirected back to Launchpad to ensure that their onboarding process was successful indicated with the blue check icon now the agency owner can access their dashboard and see performance metrics agency owners can upgrade to paid plans to get access to premium features by clicking on the building section in the sidebar billing page also has a ton of add-on products they can subscribe to these to get access to additional features and of course add-on products are completely customizable

i'm going to show you how you can create your own add-on products as well once the user clickis on the upgrade button we will show a custom stripe form and this gives a much more professional white glove onboarding experience to your customers I'm sure you've seen the traditional stripe hosted page on every single YouTube video so I decided to just go one step further and show you how you can use a custom stripe form to do same once the user puts your credit card information an hit submit their payment is successful and if the user Scrolls to the botton can see their suubscription charges

purpose of these sub accounts as an agency owner you might have multiple clients and managing all of them on one single application can be a little difficult so what we did is we gave the agency owner the ability ta create sub accounts for their clients and each sub account gets access to a bunch of amazing features if we try create a sub account a modal pops up prompting
