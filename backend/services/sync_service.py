from services.pocketbase_service import (
    get_superuser_token,
    find_user_by_name,
    create_user,
    find_household_by_head,
    create_household,
    find_family_member,
    create_family_member,
)


def sync_family(family: list[dict]):
    if not family:
        return {"success": False, "error": "Family array cannot be empty"}

    # Get superuser token for all PocketBase calls
    token = get_superuser_token()
    if not token:
        return {"success": False, "error": "Failed to authenticate with PocketBase"}

    # Step 1 — Identify head
    head = next((m for m in family if m.get("is_head")), None)
    if not head:
        family[0]["is_head"] = True
        head = family[0]

    # Step 2 — Find or create user
    existing_user = find_user_by_name(head["name"], token)
    if existing_user:
        user_id = existing_user["id"]
    else:
        new_user = create_user(head["name"], True, token)
        if not new_user:
            return {"success": False, "error": "Failed to create user"}
        user_id = new_user["id"]

    # Step 3 — Find or create household
    existing_household = find_household_by_head(user_id, token)
    if existing_household:
        household_id = existing_household["id"]
    else:
        new_household = create_household(user_id, token)
        if not new_household:
            return {"success": False, "error": "Failed to create household"}
        household_id = new_household["id"]

    # Step 4 — Insert family members (skip duplicates)
    created_members = []
    skipped_existing = []

    for member in family:
        existing = find_family_member(household_id, member["name"], token)
        if existing:
            skipped_existing.append(member["name"])
            continue

        result = create_family_member(household_id, member, token)
        if result:
            created_members.append(result["id"])

    return {
        "success": True,
        "household_id": household_id,
        "created_members": created_members,
        "skipped_existing": skipped_existing,
    }
