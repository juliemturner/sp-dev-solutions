import { SharePointUtilityModule } from '../libraries/solutions/SharePointUtility';
import { Constants } from "./Constants";
import { EnsureListResult } from "../libraries/solutions/EnsureListResult";
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { FieldTypeKind } from '../data/FieldTypeKind';

export class ProvisionManager {
  public static utility = SharePointUtilityModule.SharePointUtility;
  public static cmcListTitle: string = Constants.ContactManagementContactsListTitle;
  public static cmtListTitle: string = Constants.ContactManagementTagListTitle;
  public static cmoListTitle: string = Constants.ContactManagementOrganizationListTitle;
  public static cmcListId: string;
  public static cmtListId: string;
  public static cmoListId: string;

  public static checkSPlistsExist(ctx: IWebPartContext): Promise<boolean> {
    let cmcListExists: boolean = false;
    let cmtListExists: boolean = false;
    let cmoListExists: boolean = false;

    return ProvisionManager.utility.checkListExists(ProvisionManager.cmcListTitle)
      .then((listExists: boolean) => {
        cmcListExists = listExists;
        return ProvisionManager.utility.checkListExists(ProvisionManager.cmoListTitle);
      })
      .then((listExists: boolean) => {
        cmoListExists = listExists;
        return ProvisionManager.utility.checkListExists(ProvisionManager.cmtListTitle);
      })
      .then((listExists: boolean) => {
        cmtListExists = listExists;

        if (cmtListExists && cmoListExists && cmcListExists) {
          console.log("Organization, Contacts, and Tag lists exist");
          return Promise.resolve(true);
        }
        else {
          console.log("Organization, Contacts, and Tag lists do not exist");
          return Promise.resolve(false);
        }
      });
  }

  public static provisionSite(ctx: IWebPartContext): Promise<EnsureListResult> {
    let canProvison = ProvisionManager.utility.checkCurrentUserIsAbleToManageList(ctx.pageContext.web.permissions);

    if (!canProvison)
      return Promise.resolve(new EnsureListResult({ hasPermission: false }));

    return this.provisionLists(ctx)
      .then(() => {
        return Promise.resolve(new EnsureListResult({ contentlistExists: true, hasPermission: true }));
      });
  }

  private static provisionLists(ctx: IWebPartContext): Promise<void> {
    // Create Change Request list
    return ProvisionManager.utility.createList(ProvisionManager.cmtListTitle, "", 100, false, true)
      .then((value: any): any => {
        this.cmtListId = value.Id;
        return Promise.resolve(true);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmtListId, "Description", "Description", false, "SP.FieldMultiLineText", FieldTypeKind.Note, {
          'RichText': true
        });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createList(ProvisionManager.cmoListTitle, "", 100, false);
      })
      .then((value: any): any => {
        this.cmoListId = value.Id;
        return ProvisionManager.utility.createListField(this.cmoListId, "Description", "Description", false, "SP.FieldMultiLineText", 3, {
          'RichText': true
        });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "PrimaryAddress", "PrimaryAddress", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "PrimaryCity", "PrimaryCity", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "PrimaryStateProvince", "PrimaryStateProvince", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "PrimaryCountry", "PrimaryCountry", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "PrimaryZipPostalCode", "PrimaryZipPostalCode", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "Logo", "Logo", false, "SP.FieldUrl", FieldTypeKind.Url);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "Organizational Priority", "OrganizationalPriority", false, "SP.FieldNumber", FieldTypeKind.Number);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "Notes", "Notes", false, "SP.FieldMultiLineText", FieldTypeKind.Note);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "Owner", "Owner", false, "SP.FieldUser", FieldTypeKind.User);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "Status", "Status", false, "SP.FieldChoice", FieldTypeKind.Choice);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "Updates", "Updates", false, "SP.FieldMultiLineText", FieldTypeKind.Note);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "HomePage", "HomePage", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmoListId, "About", "About", false, "SP.FieldUrl", FieldTypeKind.Url);
      })
      .then((value: any): any => {
        return ProvisionManager.utility.createListField(this.cmoListId, "Tags", "Tags", true, "SP.FieldLookup", FieldTypeKind.Lookup, null, this.cmtListId, "Title");
      })
      .then((value: any): any => {
        return ProvisionManager.utility.updateListField(this.cmoListId, value, "SP.FieldLookup", { "AllowMultipleValues": true });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createList(ProvisionManager.cmcListTitle, "", 105, false, true);
      })
      .then((value: any): any => {
        this.cmcListId = value.Id;
        return ProvisionManager.utility.createListField(this.cmcListId, "Description", "Description", false, "SP.FieldMultiLineText", 3, {
          'RichText': true
        });
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmcListId, "Facebook", "Facebook", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmcListId, "LinkedIn", "LinkedIn", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmcListId, "Twitter", "Twitter", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((): Promise<void> => {
        return ProvisionManager.utility.createListField(this.cmcListId, "PersonalWebsite", "PersonalWebsite", false, "SP.FieldText", FieldTypeKind.Text);
      })
      .then((value: any): any => {
        return ProvisionManager.utility.createListField(this.cmcListId, "Organization", "Organization", true, "SP.FieldLookup", FieldTypeKind.Lookup, null, this.cmoListId, "Title");
      })
      .then((value: any): any => {
        return ProvisionManager.utility.createListField(this.cmcListId, "Tags", "Tags", true, "SP.FieldLookup", FieldTypeKind.Lookup, null, this.cmtListId, "Title");
      })
      .then((value: any): any => {
        return ProvisionManager.utility.updateListField(this.cmcListId, value, "SP.FieldLookup", { "AllowMultipleValues": true });
      });

  }
}