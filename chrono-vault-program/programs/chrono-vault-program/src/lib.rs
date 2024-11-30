use anchor_lang::prelude::*;

declare_id!("FcD9P4UPLe4rgeN2gHTV7VutfhiK3uHddtMj9JkTX3qV");

#[program]
pub mod chrono_vault_program {
    use super::*;

    pub fn create_capsule(
        ctx: Context<CreateCapsule>,
        recipient: Pubkey,
        release_time: i64,
        encrypted_aes_key: String,
        video_cid: String,
    ) -> Result<()> {
        let capsule = &mut ctx.accounts.capsule;
        capsule.creator = *ctx.accounts.creator.key;
        capsule.recipient = recipient;
        capsule.release_time = release_time;
        capsule.encrypted_aes_key = encrypted_aes_key;
        capsule.video_cid = video_cid;
        capsule.is_claimed = false;
        Ok(())
    }

    pub fn access_capsule(ctx: Context<AccessCapsule>) -> Result<()> {
        let capsule = &mut ctx.accounts.capsule;
        require!(
            *ctx.accounts.requestor.key == capsule.recipient,
            TimeCapsuleError::Unauthorized
        );
        require!(
            Clock::get()?.unix_timestamp >= capsule.release_time,
            TimeCapsuleError::TooEarly
        );
        require!(!capsule.is_claimed, TimeCapsuleError::AlreadyClaimed);

        capsule.is_claimed = true;
        Ok(())
    }
}

#[account]
pub struct Capsule {
    pub creator: Pubkey,
    pub recipient: Pubkey,
    pub release_time: i64,
    pub encrypted_aes_key: String,
    pub video_cid: String,
    pub is_claimed: bool,
}

#[derive(Accounts)]
pub struct CreateCapsule<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + 32 + 32 + 8 + 200 + 200 + 1
    )]
    pub capsule: Account<'info, Capsule>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AccessCapsule<'info> {
    #[account(mut)]
    pub capsule: Account<'info, Capsule>,
    pub requestor: Signer<'info>,
}

#[error_code]
pub enum TimeCapsuleError {
    #[msg("You are not authorized to access this capsule")]
    Unauthorized,
    #[msg("It is too early to access this capsule")]
    TooEarly,
    #[msg("This capsule has already been claimed")]
    AlreadyClaimed,
}
