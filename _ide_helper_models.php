<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $icon_emoji
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Discount> $discounts
 * @property-read int|null $discounts_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereIconEmoji($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $partner_id
 * @property int $category_id
 * @property string $title
 * @property string $applies_to
 * @property string $type
 * @property float $value
 * @property string $frequency
 * @property bool $is_featured
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\Partner $partner
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereAppliesTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereFrequency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount wherePartnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Discount whereValue($value)
 */
	class Discount extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $logo_path
 * @property string|null $address
 * @property string|null $phone_number
 * @property string $partner_code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Discount> $discounts
 * @property-read int|null $discounts_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner whereLogoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner wherePartnerCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Partner whereUpdatedAt($value)
 */
	class Partner extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $discount_id
 * @property numeric $total_spent
 * @property numeric $amount_saved
 * @property string $verification_method
 * @property string|null $receipt_image_path
 * @property string|null $used_vendor_code
 * @property string $status
 * @property string|null $admin_notes
 * @property string|null $reviewed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Discount $discount
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereAmountSaved($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereDiscountId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereReceiptImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereReviewedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereTotalSpent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereUsedVendorCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Redemption whereVerificationMethod($value)
 */
	class Redemption extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $employee_id
 * @property string|null $date_of_birth
 * @property string|null $date_of_hire
 * @property string $company_name
 * @property string $status
 * @property int $is_admin
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDateOfHire($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

